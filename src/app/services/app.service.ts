import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchGifsResponse } from '../interfaces/gifs-interface';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _listCharacter: any = []
  public result: Gifs[] = []

  //private apiUrl: String = 'https://api.giphy.com/v1/gifs/search?api_key=W90qGXh6gPcoIgyJ86tyBNbLzI0FCypg&q=metal gear&limit=10'
  private apiUrl: string = 'https://api.giphy.com/v1/gifs' //? Llamado a la API 
  private apiKey: string = 'W90qGXh6gPcoIgyJ86tyBNbLzI0FCypg' //? LLamado a la key

  //? Aqui se almacena el historial de busqueda
get listGifs (){
  return [...this._listCharacter]
}

  constructor( private http: HttpClient) {
  this._listCharacter = JSON.parse(localStorage.getItem('historial')!)  || []
  this.result         = JSON.parse(localStorage.getItem('resultados')!) || []
   }


  characters(query: string){

    query = query.trim().toLocaleLowerCase()

    if(!this._listCharacter.includes(query)) {
      this._listCharacter.unshift(query);
      this._listCharacter = this._listCharacter.splice(0,10)

      localStorage.setItem('historial', JSON.stringify(this._listCharacter) )
    }
    

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '20')
    .set('q', query);
    return this.http.get<SearchGifsResponse>(`${this.apiUrl}/search`, {params}).subscribe(resp => {
      console.log("RESPUESTA",resp.data);
      this.result = resp.data
      localStorage.setItem('resultados', JSON.stringify(this.result) )
   })
  }

}
