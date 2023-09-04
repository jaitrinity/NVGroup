import { Injectable } from '@angular/core';
import { Http , RequestOptions , Response , Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Constant } from '../constant/Contant';
import { AuthenticateModel } from 'src/app/login/model/authenticateModel';
import { startWith } from 'rxjs/operators';

const MENU_TRANSACTION_CACHE = "MENU_TRANSACTION_CACHE";

@Injectable()
export class SharedService{
    private phpServicePoint;
    constructor(private http:Http){
        this.phpServicePoint = Constant.phpServiceURL;
    }

    // public appUrl(companyName : string) {
    //     return this.http.get(this.phpServicePoint+'appURL.php?company='+companyName)
    //            .map((response:Response) => response.json())
    //            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    // }

    // public getAddressByLatLong(latlong : string) {
    //         return this.http.get(Constant.ADDRESS_URL+'&latlng='+latlong)
    //                .map((response:Response) => response.json())
    //                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    //     }

        // public getAddressByLatLong(latlong : string) {
        //     let latt = latlong.split(",")[0];
        //     let longg = latlong.split(",")[1];
        //     return this.http.get(Constant.ADDRESS_URL+'?lat='+latt+'&lng='+longg)
        //            .map((response:Response) => response.json())
        //            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        // }

        public getAddressByLatLong(latlong : string) {
            return this.http.get(this.phpServicePoint+'getAddressByLatLong.php?latLong='+latlong)
                   .map((response:Response) => response.json())
                   .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        }

    public authenticate(authModel:AuthenticateModel){
        let bodyString = JSON.stringify(authModel);
        return this.http.post(this.phpServicePoint+'authenticate.php',bodyString)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getMenuListByRoleName(jsonData : any){
        return this.http.post(this.phpServicePoint+'getMenuByEmpRole.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getMenuTrasactions(jsonData : any){

        return this.http.post(this.phpServicePoint+'getMenuTrasactions.php',jsonData)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    // public getMenuTrasactions(jsonData : any){
    //     let response = this.http.post(this.phpServicePoint+'getMenuTrasactions.php',jsonData)
    //             .map((response:Response) => response.json())
    //             .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
    //     response.subscribe(next => {
    //         localStorage[MENU_TRANSACTION_CACHE] = JSON.stringify(next);
    //     });

    //     response = response.pipe(
    //         startWith(JSON.parse(localStorage[MENU_TRANSACTION_CACHE] || '[]'))
    //     );

    //     return response;
    // }

    public getMenuTrasactionsDet(jsonData : any){
        
        return this.http.post(this.phpServicePoint+'getMenuTrasactionsDet.php',jsonData)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public changeTransactionStatus(jsonData : any){
        
        return this.http.post(this.phpServicePoint+'changeTransactionStatus.php',jsonData)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getCategorySubcategoryByRole(jsonData:  any) {
        return this.http.post(this.phpServicePoint+'getCategorySubcategoryByRole.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public sendOTP(jsonData: any) {
        return this.http.post(this.phpServicePoint+'sendOTPtoMobile.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public changePassword(jsonData: any) {
        
        return this.http.post(this.phpServicePoint+'changePassword.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getAllList(searchType : string, tenentId : any) {
        return this.http.get(this.phpServicePoint+'assignToEmp.php?searchType='+searchType+'&tenentId='+tenentId)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public readyAnyFile(fileName : any){
        return this.http.get('assets/'+fileName);
    }

    // 
    public getAllListBySelectType(jsonData: any, selectType : string) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType='+selectType,jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public updateDataByUpdateType(jsonData: any, updateType : any) {
        return this.http.post(this.phpServicePoint+'updateInTable.php?updateType='+updateType,jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public insertDataByInsertType(jsonData: any, insertType : string) {
        return this.http.post(this.phpServicePoint+'insertInTable.php?insertType='+insertType,jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

}