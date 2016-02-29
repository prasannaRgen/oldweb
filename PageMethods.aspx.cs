using System;
using System.Collections.Generic;
using System.Web.Script.Services;
using System.Web.Services;

public partial class PageMethods : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {

        }

    }

    [WebMethod()]
    [ScriptMethod()]
    public static string GetValidate(string _ModuleName, string _A, string _B, string _C, string _D)
    {
        string Result = "";
        try
        {
            System.Net.WebClient client = new System.Net.WebClient();
            client.Headers.Add("content-type", "application/json");//set your header here, you can add multiple headers
            string arr = client.DownloadString(string.Format("{0}api/Validate/{1}?&_A={2}?&_B={3}?&_C={4}?&_D={5}", System.Web.HttpContext.Current.Session["WebApiUrl"].ToString(), _ModuleName, _A, _B, _C, _D));
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            Result = serializer.Deserialize<string>(arr);
            //using (var client = new HttpClient())
            //{
            //    client.BaseAddress = new Uri(System.Web.HttpContext.Current.Session["WebApiUrl"].ToString());
            //    client.DefaultRequestHeaders.Accept.Clear();
            //    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            //    var response = client.GetAsync(string.Format("api/Validate/{0}?&_A={1}?&_B={2}?&_C={3}?&_D={4}", _ModuleName, _A, _B, _C, _D)) ;

            //}

        }
        catch (Exception)
        {

            Result = "#Error";
        }
        return Result;
    }


    [WebMethod]
    [ScriptMethod]
    public static string[] GetText(string Prefix, int count, string ContextKey)
    {
        //TTSHWCFServiceClient sc = new TTSHWCFServiceClient();
        List<string> lst = new List<string>();
        //lst.AddRange(sc.GetText(Prefix, count, ContextKey));
        System.Net.WebClient client = new System.Net.WebClient();
        client.Headers.Add("content-type", "application/json");//set your header here, you can add multiple headers
        string arr = client.DownloadString(string.Format("{0}api/AutoComplete/{1}?&count={2}?&ContextKey={3}", System.Web.HttpContext.Current.Session["WebApiUrl"].ToString(), Prefix, count, ContextKey));
        System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
        lst = serializer.Deserialize<List<string>>(arr);
        return lst.ToArray();
    }

    [WebMethod]
    [ScriptMethod]
    public static TTSH.Entity.PI_Master GetPI_MasterDetailsByID(int ID)
    {
        string Result = "";
        try
        {
            System.Net.WebClient client = new System.Net.WebClient();
            client.Headers.Add("content-type", "application/json");//set your header here, you can add multiple headers
            string arr = client.DownloadString(string.Format("{0}api/PIMaster/{1}", System.Web.HttpContext.Current.Session["WebApiUrl"].ToString(), ID));
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            return serializer.Deserialize<TTSH.Entity.PI_Master>(arr);
        }
        catch (Exception)
        {

            return null;
        }
       // return Result;
    }

    [WebMethod]
    [ScriptMethod]
    public static string GetCollobrator_MasterDetailByID(int ID)
    {
        string Result = "";
        //TTSHWCFServiceClient cl = new TTSHWCFServiceClient();
        //try
        //{
        //    Result = cl.GetCollobrator_MasterDetailByID(ID);
        //}
        //catch (Exception)
        //{

        //    Result = "";
        //}
        return Result;
    }


}