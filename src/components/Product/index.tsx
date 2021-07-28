import React, { ReactNode } from "react"

interface IProps {
  product: any,
  children: ReactNode
}

export default function Product({ product, children }: IProps) {
  return (
    <div className="shadow border rounded-lg bg-white mb-6 divide-y divide-gray-200 divide-y height-full overflow-hidden">
      <div className={'px-4 py-4 divide-b flex items-center'}>
        <div className={'pr-4 w-3/5 flex items-center'}>
          <div className={'mr-4'}>
            <a href={product?.permalink} target="_blank">
              <img width="90" height="90" src={product?.customData?.secure_thumbnail} className="ui-search-result-image__element" alt="Console Playstation 4 1tb Bundle 18 - Ps4" />
            </a>
          </div>
          <div>
            <span className={'text-sm text-gray-400'}>
              { product?.customData?.condition }
            </span>
            <h3 className={'text-1xl'}>
              <a href={product?.permalink} target="_blank" className="block">
                {product?.customData?.title}
              </a>
            </h3>
            <div>
              <span className={'font-bold text-blue-500 text-2xl'}>
                {product?.customData?.formatted_price}
              </span>
            </div>
          </div>
        </div>
        <div className={'w-2/5'}>
          {children}
        </div>
      </div> 
    </div> 
  );
}
