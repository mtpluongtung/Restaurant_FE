import { AuthenticationService } from "../_service/Authentication.service";



export function appInitializer(authenticationservices: AuthenticationService){
    return ()=> new Promise((resolve:any) =>{
        authenticationservices.refreshToken()
        .subscribe()
        .add(resolve);
    })
}