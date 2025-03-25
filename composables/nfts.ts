const formatNftDatum = (datum: any) => {
  return {
    attributes: (datum.attributes && typeof datum.attributes !== 'string') ? datum.attributes : [],
    collection: datum.artistName || "Unknown collection",
    name: datum.title || datum.name || "Unknown name",
    description: datum.description || "No description available.",
    createdAt: datum.creationDate || datum['create-date'] || null,
    image: datum.assetUrl || datum.thumbnailUrl || null,
  }
}

export const useNft = (contract?: any) => {
  if (!contract) {
    return {
      image: null,
      attributes: [],
      createdAt: null,
      name: "Unknown name",
      collection: "Unknown collection",
      description: "No description available.",
    }
  }

  const {
    data,
  } = JSON.parse(contract?.metadata);

  return formatNftDatum(data[0].datum);
}
