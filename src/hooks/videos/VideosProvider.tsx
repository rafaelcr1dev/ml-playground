import React, { createContext, useState, useContext, useCallback } from "react";

import { 
  ProductSearchController,
  ProductMultipleController,
  SerializeProductsController
} from "../../controllers/product";

import { 
  SearchModel, 
  ProductMultipleModel 
} from "../../models";

const VideosProviderContext = createContext({});

const productSearchController = new ProductSearchController(new SearchModel());
const productMultipleController = new ProductMultipleController(new ProductMultipleModel(), new SerializeProductsController());

const VideosProvider = ({ children, query }: any) => {
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [videos, setVideos] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const makeVideos = useCallback(
    async (querySearch: string) => {
      setErrorMessage("");
      setLoadingVideos(true);
      setVideos([]);

      try {
        const products = await productSearchController.select(
          querySearch
        );

        const responseVideos = await productMultipleController.selectByIdItems(
          products
        );

        setVideos(responseVideos);
      } catch (e) {
        setErrorMessage(e.message);
      } finally {
        setLoadingVideos(false);
      }
    },
    [videos]
  );

  return (
    <VideosProviderContext.Provider
      value={{
        query,
        loadingVideos,
        videos,
        makeVideos,
        errorMessage,
      }}
    >
      {children}
    </VideosProviderContext.Provider>
  );
};

function useVideos() {
  const context = useContext(VideosProviderContext);

  if (!context) {
    throw new Error(
      "useVideosProvider must be used within as VideosProviderContext"
    );
  }

  return context;
}

export { VideosProvider, useVideos };
