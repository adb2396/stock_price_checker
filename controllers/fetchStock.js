exports.fetchStock = async function(stock) {
    try {
        let data = await fetch(
            `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`
        );
        
        if (data === 'Unknown symbol') throw data;

        return data.json(); 
    } catch (error) {
        return { error };
    }      
};