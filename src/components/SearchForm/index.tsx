import React, { useState, useCallback, FormEvent } from "react"

import baseStyle from "../../styles/base.module.css";
import searchStyle from "../../styles/search.module.css";

interface IProps {
  onSubmit: Function,
  placeholderText: string,
  buttonText: string
}

export default function SearchForm({ onSubmit, placeholderText, buttonText }: IProps) {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback((e:FormEvent) => {
    onSubmit(e, value)
    setValue('')
  }, [value])

  return (
    <section className={searchStyle.container + ' pt-3 pb-3 border-b border-gray-200'}>
      <div className={baseStyle.content}>
        <div className="w-full flex">
          <form className="w-2/5" onSubmit={e => handleSubmit(e)} autoComplete="off">
            <div className="flex">
              <input value={value} onChange={e => setValue(e.target.value)} className="shadow appearance-none  mr-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="search" placeholder={placeholderText} required />
              <button className="border-b-2 font-bold border-blue-600 text-sm bg-blue-500 py-2 px-3 rounded text-white" aria-current="page">
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
