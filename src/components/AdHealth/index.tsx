import React, { useCallback, useEffect, FormEvent, useMemo, useState } from 'react';

import Head from "next/head";

import { FiCheckCircle, FiArrowUpLeft } from "react-icons/fi";
import { AiOutlineWarning } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import { BiCheckCircle } from "react-icons/bi";
import { GiHealthNormal } from "react-icons/gi";

import Header from "../Header";
import Footer from "../Footer";
import SearchForm from "../SearchForm";

import Presentation from '../Presentation'
import Error from '../Error'
import Loading from '../Loading'

import { useProduct } from '../../hooks/product/ProductProvider'
import { useAdHealth } from '../../hooks/ad-health/AdHealthProvider'

import Product from '../../components/Product'

import baseStyle from "../../styles/base.module.css";

export default function AdHealth() {
  const { 
    product, 
    loadingProduct, 
    makeProduct,
    errorMessage 
  }:any = useProduct()

  const { 
    loadingSimilarProducts, 
    makeVerifyResults, 
    infoResults 
  }:any = useAdHealth()

  const [ urlValue, setUrlValue ] = useState({})

  const handleSubmit = useCallback(async (e:FormEvent, value: string) => {
    e.preventDefault();
    setUrlValue(value)
    await makeProduct(value);
  }, [product])

  useEffect(() => {
    const init = async () => {
      await makeVerifyResults(product, urlValue)
    }

    if (product.id) init()
  }, [product]);

  const totalResultsWarning = useMemo(() => {
    return infoResults.filter((result:any) => result.isWarning).length
  }, [infoResults])

  const totalResultsConfirm = useMemo(() => {
    return infoResults.filter((result:any) => !result.isWarning).length
  }, [infoResults])

  return (
    <div className={baseStyle.container}>
      <Head>
        <title>Saúde do anuncio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <main className={baseStyle.main}>
        <Header activeIdItem={3} />
        <SearchForm buttonText={'Adicionar'} placeholderText={"Insira a url do produto"} onSubmit={handleSubmit} />

        <section className={baseStyle.presentation + " py-8"}>

        {(product && product.id && !loadingProduct) ? (
          <div className={baseStyle.content}>
            <hgroup className="mb-6">
              <h1 className="text-3xl mb-2">É fraude?</h1>
              <h2 className="text-sm text-gray-600">
                Verificaremos se esse anuncio é seguro
              </h2>
            </hgroup>

              <Product product={product}>
                {totalResultsConfirm || totalResultsWarning ? (
                  <>
                      {totalResultsConfirm && !totalResultsWarning ? (
                        <div className={'flex items-center'}>
                          <div className={'mr-4'}>
                            <FiCheckCircle size={40} className={'text-green-500'} />
                          </div>
                          <div>
                            <span className={'font-bold text-green-500 text-2xl'}>Aprovado!</span>                       
                            <p className={'text-sm text-gray-500'}>Esse produto esta seguro para compra</p>
                          </div>
                        </div>
                      ) : (
                        <div className={'flex items-center'}>
                          <div className={'mr-4'}>
                            <AiOutlineWarning size={40} className={'text-yellow-500'} />
                          </div>
                          <div>
                            <span className={'font-bold text-yellow-500 text-2xl'}>Alerta!</span>                       
                            <p className={'text-sm text-gray-500'}>Existe {totalResultsWarning} ponto(s) de atenção nesse anuncio</p>
                          </div>
                        </div>
                      )}
                  </>
                ) : ("")}
              </Product>
              
              {infoResults.length ? (
                <div className="w-full">
                  <table className="mx-auto w-full rounded-lg bg-white divide-y divide-gray-200 overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr className="text-gray-600 text-left">
                        <th
                          className="font-semibold text-sm uppercase px-6 py-4"
                          width="25%"
                        >
                          Nome
                        </th>
                        <th
                          className="font-semibold text-sm uppercase px-6 py-4"
                          width="75%"
                        >
                          Descrição
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white">
                      {infoResults.map((result: any, key: number) => (
                        <tr key={`result-info--${key}`} className={`${result.isWarning ? 'bg-red-50' : 'bg-green-50'}`}>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="inline-flex w-10 h-10">
                                {result.isWarning ? (
                                  <VscError size="38" className="text-red-500"/>
                                ) : (
                                  <BiCheckCircle size="38" className="text-green-500"/>
                                )}
                              </div>
                              <div>
                                <p className={`text-sm ${result.isWarning ? 'text-red-500' : 'text-green-500'}`}>
                                  <strong>{result.title}</strong>
                                </p>
                                <span className="text-sm text-gray-600">{result.description}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <p dangerouslySetInnerHTML={{__html: result.content}}></p>                          
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : ("")}
          </div>
          ) : (
            <>
              {loadingSimilarProducts ? (
                <div className={baseStyle.content}>
                  <Loading />
                </div>
              ) : (
                <div className={baseStyle.content}>
                  {!errorMessage ? (
                    <Presentation>
                      <span className="mb-2 border border-gray-200 rounded-full text-center p-4">
                        <GiHealthNormal size="74" className="text-blue-500" />
                      </span>
                      <h1 className="text-2xl mb-2">
                        Verifique a saúde desse anúncio
                      </h1>
                      <p className="text-gray-400 flex items-center">
                        <span className="mr-1">
                          <FiArrowUpLeft size="24" /> 
                        </span>
                        Adicione o link do produto no campo acima!
                      </p>
                    </Presentation>
                  ) : (
                    <Error messageText={errorMessage} />
                  )}
                </div>
              )}
            </>
          )}
        </section>

        <Footer />
      </main>
    </div>
  );
}
