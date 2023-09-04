export class Constant{

    // PROD
    public static phpServiceURL = "/NVGroup/";
    // public static phpServiceURL = "http://www.trinityapplab.in/NVGroup/";

    // Test
    // public static phpServiceURL = "/NVGroupv1/";
    // public static phpServiceURL = "http://www.trinityapplab.in/NVGroupv1/";
    
    public static SUCCESSFUL_STATUS_CODE = "100000";
    public static GENERIC_DATABASE_ERROR = "-102003";
    public static NO_RECORDS_FOUND_CODE = "102001";
    public static ALREADY_EXIST_CODE = "403";
    public static NO_RECORD_FOUND = "No Record Found";
    public static TRINITY_PRIVATE_KEY = "TRINITYPRIVATEKEY";
    public static GOOGLE_MAP_API_KEY = "AIzaSyDkv0_3UwK1Y_EpQ1LHQr5KA5oVBMc1160";
    public static SERVER_ERROR = "Server Error";
    public static TOSTER_FADEOUT_TIME = 1000;
    public static ALERT_FADEOUT_TIME = 2000;
    public static AUTO_LOGOUT_TIME = 600 // in second
    
    public static returnServerErrorMessage(serviceName:string):string{
        return "Server error while invoking "+serviceName+ " service";
    }
    
}