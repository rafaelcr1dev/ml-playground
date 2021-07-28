import { formatMoney } from './formatMoney'

const listTags: any = {
  "brand_verified": "Marca verificada",
  "deal_of_the_day": "Acordo do dia",
  "good_quality_picture": "Imagem de boa qualidade",
  "good_quality_thumbnail": "Miniatura de boa qualidade",
  "immediate_payment": "Pagamento imediato",
  "cart_eligible": "Carrinho elegível"
}

export const serializeProduct = (product: any) => {
  const {
    price,
    original_price,
    condition,
    tags,
    pictures,
    accepts_mercadopago,
    seller_address,
    status,
    date_created,
    last_updated,
    video_id,
    attributes,
    secure_thumbnail
  } = product;

  const date_date_created = new Date(date_created);
  const date_last_updated = new Date(last_updated);
  const video = (video_id) ? video_id.split('/') : '';
  const video_id_yt =  (typeof video === "object") ? video[video.length - 1] : video_id;

  product.customData = {
    title: product.title,
    title_truncate: (product.title.length > 36) ? `${product.title.substring(0, 36)}...` : product.title,
    formatted_price: formatMoney(price),
    formatted_original_price: (original_price) ? formatMoney(original_price) : "",
    tags: tags.map((tag: string) => {
      return listTags[tag];
    }),
    condition: (condition === "new") ? "Novo" : "Usado",
    image: pictures[0].secure_url,
    secure_thumbnail,
    accepts_mercadopago: (accepts_mercadopago) ? "Sim" : "Não",
    seller_name: attributes[0].value_name,
    seller_address: `${seller_address.city.name}, ${seller_address.state.name} - ${seller_address.country.name}`,
    status: (status === "active") ? "Disponível" : "Indisponível",
    formatted_date_created: date_date_created.toLocaleDateString(),
    formatted_last_updated: date_last_updated.toLocaleDateString(),
    video: {
      video_id: video_id_yt,
      thumb_image: `https://img.youtube.com/vi/${video_id_yt}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${video_id_yt}` 
    }
  }

  return product;
}