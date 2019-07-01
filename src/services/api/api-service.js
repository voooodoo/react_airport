class ApiService {

  _baseUrl = 'https://api.iev.aero/api/flights/';

  getData = date => {
    return fetch(`${this._baseUrl}${date}`)
      .then(response => response.json())
      .then(data => data.body)
  }

}

export default new ApiService();
