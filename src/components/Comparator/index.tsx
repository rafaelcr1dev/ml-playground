import { useCallback, FormEvent } from 'react'

import Head from 'next/head'
import baseStyle from '../../styles/base.module.css'
import { FiTrash, FiArrowUpLeft } from 'react-icons/fi'
import { IoIosGitCompare } from 'react-icons/io'

import Header from '../Header'
import Footer from '../Footer'
import SearchForm from '../SearchForm'

import Presentation from '../Presentation'
import Error from '../Error'
import Loading from '../Loading'

import { useComparator } from '../../hooks/comparator/ComparatorProvider'

export default function Comparator() {
  const { 
    products, 
    loading, 
    makeProducts, 
    onDelete,
    errorMessage
  }: any = useComparator()

  const handleSubmit = useCallback(
    async (e: FormEvent, value: string) => {
      e.preventDefault()
      await makeProducts(value)
    },
    [products]
  )

  const handleDelete = useCallback(
    (e: FormEvent, position: number) => {
      e.preventDefault()

      onDelete(position)
    },
    [products]
  )

  return (
    <div className={baseStyle.container}>
      <Head>
        <title>Comparador de produtos ({products.length})</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <main className={baseStyle.main}>
        <Header activeIdItem={1} />
        <SearchForm
          buttonText={"Adicionar"}
          placeholderText={"Insira a url do produto"}
          onSubmit={handleSubmit}
        />

        <section className={`${baseStyle.presentation} py-8`}>
          {products.length && !loading ? (
            <div className={baseStyle.content}>
              <hgroup className="mb-6">
                <h1 className="text-3xl mb-2">
                  Compare e encontre o <b className="text-blue-500">produto</b> ideal para você
                </h1>
                <h2 className="text-sm text-gray-600">
                  {products.length} produto(s) adicionado(s) no comparador
                </h2>
              </hgroup>
              <div className={"compare-table text-sm overflow-x-auto pb-1"}>
                <table className="table-fixed shadow border rounded-lg bg-white divide-y divide-gray-200 overflow-hidden">
                  <thead>
                    <tr className="text-gray-600 text-left">
                      <td
                        className="px-4 py-4 border-l bg-gray-50 font-semibold"
                        width="60px"
                      >
                        Produto
                      </td>
                      {products.map((item: any, key: number) => (
                        <td
                          key={`image-thumb-` + key}
                          className="px-4 py-4 border-l text-center relative"
                          width="240px"
                          valign="top"
                        >
                          <a
                            href="#"
                            onClick={(e) => handleDelete(e, key)}
                            className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 hover:bg-red-700 rounded-full top-2 right-0 absolute"
                          >
                            <span className="mr-1">
                              <FiTrash size="14" />
                            </span>{" "}
                            Remover
                          </a>
                          <a
                            href={item.permalink}
                            target="_blank"
                            className="block mb-2"
                          >
                            <img
                              width="284"
                              height="284"
                              src={item?.customData?.image}
                              className="ui-search-result-image__element"
                              alt="Console Playstation 4 1tb Bundle 18 - Ps4"
                            />
                          </a>
                          <h3>
                            <span>{item?.customData?.title}</span>
                          </h3>
                        </td>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-gray-600 text-left">
                      <td
                        className="px-4 py-4 border-l font-semibold"
                        width="60px"
                      >
                        Status
                      </td>
                      {products.map((item: any, key: number) => (
                        <td
                          key={`status-` + key}
                          className="px-4 py-4 border-l"
                          width="240px"
                        >
                          {item?.customData?.status}
                        </td>
                      ))}
                    </tr>
                    <tr className="text-gray-600 text-left">
                      <td
                        className="px-4 py-4 border-l bg-gray-100 font-semibold"
                        width="60px"
                      >
                        Situação
                      </td>
                      {products.map((item: any, key: number) => (
                        <td
                          key={`condition-` + key}
                          className="px-4 py-4 border-l bg-gray-50"
                          width="240px"
                        >
                          {item?.customData?.condition}
                        </td>
                      ))}
                    </tr>
                    <tr className="text-gray-600 text-left">
                      <td
                        className="px-4 py-4 border-l font-semibold"
                        width="60px"
                      >
                        Preço
                      </td>
                      {products.map((item: any, key: number) => (
                        <td
                          key={`price-` + key}
                          className="px-4 py-4 border-l"
                          width="240px"
                        >
                          <strong className="text-blue-500 text-lg">
                            {item?.customData?.formatted_price}
                          </strong>
                          <span className="ml-2 text-xs line-through text-gray-400">
                            {item?.customData?.formatted_original_price}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="text-gray-600 text-left">
                      <td
                        className="px-4 py-4 border-l bg-gray-100 font-semibold"
                        width="60px"
                      >
                        Quantidade
                      </td>
                      {products.map((item: any, key: number) => (
                        <td
                          key={`available_quantity-` + key}
                          className="px-4 py-4 border-l bg-gray-50"
                          width="240px"
                        >
                          {item?.available_quantity} unidade(s)
                        </td>
                      ))}
                    </tr>
                    <tr className="text-gray-600 text-left">
                      <td
                        className="px-4 py-4 border-l  font-semibold"
                        width="60px"
                      >
                        Aceita Mercado Pago?
                      </td>
                      {products.map((item: any, key: number) => (
                        <td
                          key={`accepts_mercadopago-${key}`}
                          className="px-4 py-4 border-l"
                          width="240px"
                        >
                          {item?.customData?.accepts_mercadopago}
                        </td>
                      ))}
                    </tr>
                    <tr className="text-gray-600 text-left">
                      <td
                        className="px-4 py-4 border-l bg-gray-100 font-semibold"
                        width="60px"
                      >
                        Garantia
                      </td>
                      {products.map((item: any, key: number) => (
                        <td
                          key={`warranty-${key}`}
                          className="px-4 py-4 border-l bg-gray-50"
                          width="240px"
                        >
                          {item?.warranty}
                        </td>
                      ))}
                    </tr>
                    <tr className="text-gray-600 text-left">
                      <td
                        className="px-4 py-4 border-l font-semibold"
                        width="60px"
                      >
                        Tags
                      </td>
                      {products.map((item: any, key: number) => (
                        <td
                          key={`tags-${key}`}
                          className="px-4 py-4 border-l"
                          width="240px"
                        >
                          {item?.customData?.tags.map(
                            (tag: string, key: number) => (
                              <span className="block" key={key}>
                                {tag}
                              </span>
                            )
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="text-gray-600 text-left">
                      <td
                        className="px-4 py-4 border-l bg-gray-100 font-semibold"
                        width="60px"
                      >
                        Criado em:
                      </td>
                      {products.map((item: any, key: number) => (
                        <td
                          key={`formatted_date_created-${key}`}
                          className="px-4 py-4 border-l bg-gray-50"
                          width="240px"
                        >
                          {item?.customData?.formatted_date_created}
                        </td>
                      ))}
                    </tr>
                    <tr className="text-gray-600 text-left">
                      <td
                        className="px-4 py-4 border-l font-semibold"
                        width="60px"
                      >
                        Atualizado em:
                      </td>
                      {products.map((item: any, key: number) => (
                        <td
                          key={`formatted_last_updated-${key}`}
                          className="px-4 py-4 border-l"
                          width="240px"
                        >
                          {item?.customData?.formatted_last_updated}
                        </td>
                      ))}
                    </tr>
                    <tr className="text-gray-600 text-left">
                      <td
                        className="px-4 py-4 border-l font-semibold"
                        width="60px"
                      >
                        Localidade:
                      </td>
                      {products.map((item: any, key: number) => (
                        <td
                          key={`seller_address-${key}`}
                          className="px-4 py-4 border-l"
                          width="240px"
                        >
                          {item?.customData?.seller_address}
                        </td>
                      ))}
                    </tr>
                    <tr className="text-gray-600 text-left">
                      <td
                        className="px-4 py-4 border-l bg-gray-100 font-semibold"
                        width="60px"
                      >
                        Youtube:
                      </td>
                      {products.map((item: any, key: number) => (
                        <td
                          key={`thumb_image-${key}`}
                          className="px-4 py-4 border-l bg-gray-50"
                          width="240px"
                        >
                          {item?.customData?.video?.video_id ? (
                            <a
                              target="_blank"
                              href={item?.customData?.video?.url}
                            >
                              <img src={item?.customData?.video?.thumb_image} />
                            </a>
                          ) : (
                            "NDA"
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="text-gray-600 text-left">
                      <td
                        className="px-4 py-4 border-l font-semibold"
                        width="60px"
                        valign="top"
                      >
                        Atributos
                      </td>
                      {products.map((item: any, key: number) => (
                        <td
                          key={`attr-value-${item.id}-${key}`}
                          className="px-4 py-4 border-l"
                          width="240px"
                          valign="top"
                        >
                          {item?.attributes?.map(
                            (attr: any, keyAttr: number) => (
                              <div
                                key={`attr-value-title-${item.id}-${attr.id}-${key}-${keyAttr}`}
                              >
                                <span className="block font-semibold text-xs">
                                  {attr?.name}
                                </span>
                                {attr?.values?.map(
                                  (value: any, key: number) => (
                                    <span
                                      key={`attr-value-item-${item.id}-${attr.id}-${value.id}-${key}`}
                                      className="block mb-3 text-gray-500 text-small"
                                    >
                                      {value?.name || "Não informado"}
                                    </span>
                                  )
                                )}
                              </div>
                            )
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="text-gray-600 text-left">
                      <td
                        className="px-4 py-4 border-l bg-gray-100 font-semibold"
                        width="60px"
                      ></td>
                      {products.map((item: any, key: number) => (
                        <td
                          key={`permalink-${key}`}
                          className="px-4 py-4 border-l bg-gray-50"
                          width="240px"
                        >
                          <a
                            href={item.permalink}
                            target="_blank"
                            className="block text-center border-b-2 w-full border-blue-600 text-sm bg-blue-500 py-2 px-3 rounded text-white"
                          >
                            Ver anúncio 
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <>
              {loading ? (
                <div className={baseStyle.content}>
                  <Loading />
                </div>
              ) : (
                <div className={baseStyle.content}>
                  {!errorMessage ? (
                    <Presentation>
                      <span className="mb-2 border border-gray-200 rounded-full text-center p-4">
                        <IoIosGitCompare size="74" className="text-blue-500" />
                      </span>
                      <h1 className="text-2xl mb-2">
                        Compare as principais características dos produtos antes
                        de comprar
                      </h1>
                      <p className="text-gray-400 flex items-center">
                        <span className="mr-1">
                          <FiArrowUpLeft size="24" />
                        </span>
                        Adicione links de produtos no campo acima!
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
  )
}
