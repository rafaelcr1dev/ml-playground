import { useCallback, FormEvent, useState } from 'react';

import Head from 'next/head'
import baseStyle from '../../styles/base.module.css'
import videosStyle from '../../styles/videos.module.css'

import Header from '../Header'
import Footer from '../Footer'
import SearchForm from '../SearchForm'

import Presentation from '../Presentation'
import Error from '../Error'
import Loading from '../Loading'

import { useVideos } from '../../hooks/videos/VideosProvider'

import { FiArrowUpLeft, FiPlayCircle } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";

export default function Videos() {
  const { loadingVideos, makeVideos, videos, errorMessage }:any = useVideos();
  const [ querySearch, setQuerySearch ] = useState("");

  const handleSubmit = useCallback(async (e:FormEvent, value: string) => {
    e.preventDefault();
    setQuerySearch(value);
    await makeVideos(value);
  }, [])

  return (
    <div className={baseStyle.container}>
      <Head>
        <title>Video</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <main className={baseStyle.main}>
        <Header activeIdItem={5} />
        <SearchForm buttonText={'Buscar'} placeholderText={"Buscar produtos, marcas e muito mais…"} onSubmit={handleSubmit} />
        
        <section className={baseStyle.presentation + ' py-8'}>
          {!loadingVideos && videos.length ? (
          <div className={`${baseStyle.content} px-3 lg:px-0`}>
            <hgroup className="mb-6">
              <h1 className="text-2xl lg:text-3xl mb-2">Busca por <b className="text-blue-500">{querySearch}</b></h1>
              <h2 className="text-sm text-gray-600">{videos.length} video(s) foram encontrado(s)</h2>
            </hgroup>

            <ul className={'list flex flex-wrap'}>
              {videos.map((video: any, key: number) => (
                <li key={`video-${key}`} className={'w-full lg:w-1/4 p-2'}>
                  <div className="bg-white shadow">
                    <div className={videosStyle.containerPlayVideo} >
                      <a className={videosStyle.linkPlayVideo} href={video.customData.video.url} target="_blank">
                        <img width="100%" height="auto" src={`${video.customData.video.thumb_image}`} className="ui-search-result-image__element" alt="Console Playstation 4 1tb Bundle 18 - Ps4" />
                        <div className={videosStyle.iconPlayVideo}>
                          <FaPlay size="48" className="text-white" />
                        </div>
                      </a>
                    </div>
                    <div className="p-4 flex items-center rounded">
                      <div className={'w-1/5 mr-2'}>
                        <div style={{background: `url(${video.customData.secure_thumbnail}) no-repeat center center`, "backgroundSize": "contain"}} className={'flex w-11 h-11 border border-gray-200 rounded-full'}></div>
                      </div>
                      <div className={'text-sm w-4/5'}>
                        <h3 className={'block'}>
                          <a href={video.customData.video.url} target="_blank" title={video.customData.title}>
                            {video.customData.title_truncate}
                            <span className="inline-flex ml-2 items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                              Video
                            </span>
                          </a>
                        </h3>
                        <a className={'text-xs text-blue-500 underline b'} target="_blank" href={video.permalink}>
                          Ir para o anúncio
                        </a>
                      </div>
                    </div>
                  </div>
                </li>      
              ))}       
            </ul>
          </div>
          ) : (
            <>
              {loadingVideos ? (
                <div className={`${baseStyle.content} px-3 lg:px-0`}>
                  <Loading />
                </div>
              ) : (
                <div className={`${baseStyle.content} px-3 lg:px-0`}>
                  {!errorMessage ? (
                    <Presentation>
                      <span className="mb-2 border border-gray-200 rounded-full text-center p-4">
                        <FiPlayCircle size="48" className="text-blue-500" />
                      </span>
                      <h1 className="text-1xl lg:text-2xl mb-2 text-center lg:text-left">
                        Encontre videos dentro de anúncios
                      </h1>
                      <p className="text-gray-400 text-sm flex items-center">
                        <span className="mr-1">
                          <FiArrowUpLeft size="24" /> 
                        </span>
                        Busque por um produto no campo acima!
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
