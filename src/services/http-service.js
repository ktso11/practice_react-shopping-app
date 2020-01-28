import 'whatwg-fetch';

class HttpService {
    getProducts = () => {
        //1
        var promise = new Promise((resolve, reject) =>{
            //2
            fetch('http://localhost:3004/product')
           //4
            .then(response => {
                resolve(response.json())
            })
        })
        //3 returning a promise that the response will be fulfilled 
        return promise;

    }
}


export default HttpService;