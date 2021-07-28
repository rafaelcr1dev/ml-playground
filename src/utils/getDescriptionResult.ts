export const getDescriptionResult = (
  title: string,
  description: string,
  isWarning: boolean,
  content?: string,
) => {
  return {
    title,
    description,
    isWarning,
    content
  }
}