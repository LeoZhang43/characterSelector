export const getUniqueValues = (data, type) => {
    let unique;
    if(type === 'location'){
        unique = data.map((item) => item[type].name)
    }else{
        unique = data.map((item) => item[type])
    }
    
    if(type === 'episode'){
        unique = unique.flat()
    }
    return ['all', ...new Set(unique)]
}