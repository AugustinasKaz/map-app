import axios from 'axios'

export async function AddNewUser(userInput) {
    const promise = await axios.post('/api/addNewUser', { user: userInput });
    const status = promise.status
    var response = {};
    if (status === 200) {
      let res = promise.data
      if (res.name === 'error')
        response = {status: 'error', detail: res.detail}
      else
        response = {status: 'success', detail: " "}
    }
    else 
        response = {status: 'error', detail: `Failed ${status}`}
    return response;
}

export async function RemoveCity(city, user) {
    const promise = await axios.post('/api/removeCity', { city: city, user: user});
    const status = promise.status
    var response = {};
    if (status === 200) {
      let res = promise.data
      if (res.name === 'error')
        response = {status: 'error', detail: res.detail}
      else
        response = {status: 'success', detail: " "}
    }
    else 
        response = {status: 'error', detail: `Failed ${status}`}
    return response;
}

export async function GetUsersCities(username){
    const promise = await axios.post('/api/getUsersCities', { user: username });
    const status = promise.status
    var response = {};
    if (status === 200)
        response = {status: 'success', detail: promise.data}
    else 
        response = {status: 'error', detail: `Failed ${status}`}
    return response;
}

export async function AddNewCity(username, cityName){
    const promise = await axios.post('/api/addNewCity', {user: username, city: cityName})
    const status = promise.status
    var response = {};
    if (status === 200)
        response = {status: 'success', detail: " "}
    else
        response = {status: 'error', detail: `Failed ${status}`}
    return response;
}

export async function GoogleNews(cities){
    let articles = []
    for (let city of cities) {
      const promise = await axios.get(`https://newsapi.org/v2/everything?q=${city.city_name}&apiKey=81ed2033ac864fa5bc932f088b9bbc44`);
      const status = promise.status;
      const data = promise.data;
      if (status === 200) {
        let tmp1 = [] //tmp array for titles
        let articles_num;
        if (data.articles.length >= 3)
            articles_num = 3;
        else
            articles_num = data.articles.length;
        for (var i = 0; i < articles_num; i++) {
          tmp1.push(data.articles[i].title, data.articles[i].url)
          var tmp_obj = { city: city.city_name, title_url: tmp1 }
        }
        articles.push(tmp_obj)
      }
    }
    return articles;
}