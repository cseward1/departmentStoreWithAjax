$(document).ready(function () {
    const outputEl = $(".productListing")

let blahBlah = function(event)  
{    // load the products data
    console.log(event)   
    $.ajax({
        "url": "products.json"
    }).then(productData => {
        let finalHTML = ""
        // after products are done loading, store them
        const products = productData.products
        //  then request categories 
        $.ajax({
            "url": "categories.json"
        }).then(categoryData => {
            let finalHTML = ""
            // store categories
            const categories = categoryData.categories

            const selection = parseInt(this.value); /* $("#seasons").value */

            // build HTML represetation of products
            products.forEach(product => {
                // find catagory for this product
                const productCategory = categories.find(c => c.id === product.category_id)
                
            if (product.category_id === selection) {
                finalHTML += `
                <article id="product_${product.id}">
                    <h1>${product.name}</h1>
                    <div>Catagory: ${productCategory.name}</div>    
                    <div>Price: $${(product.price - (product.price * productCategory.discount)).toFixed(2)}</div>
                </article>
                    `
                } else {
                    finalHTML += `
                    <article id="product_${product.id}">
                        <h1>${product.name}</h1>
                        <div>Catagory: ${productCategory.name}</div>    
                        <div>Price: $${product.price}</div>
                    </article>
                        `
                    }
                })
                
                
                outputEl.html(finalHTML)
            })
        })
    }
    $("#seasons").change(blahBlah)
})
