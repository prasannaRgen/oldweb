using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Web.UI.WebControls;
using System.IO;
using System.Globalization;
using System.Web.UI;
using System.Net.Mail;
using System.Text;
using System.Reflection;
using System.ServiceModel.Configuration;
using System.Web.Configuration;
using TTSH.Entity;
using System.Web.Script.Serialization;
/// <summary>
/// Summary description for Common
/// </summary>
public static class Common
{
    public static string SaveFile(FileUpload fileUpload)
    {
        Boolean fileOK = true;
        string relativePath = "Documents/";

        string msg = "";
        if (fileUpload.HasFile)
        {

            String path = HttpContext.Current.Server.MapPath("~/Documents/");

            if (fileOK)
            {
                try
                {
                    if (System.IO.File.Exists(path + fileUpload.FileName))
                    {
                        msg = "File Exists";
                    }
                    else
                    {
                        relativePath = relativePath + fileUpload.FileName;

                        fileUpload.PostedFile.SaveAs(path + fileUpload.FileName);
                        msg = "File Saved";
                    }

                }
                catch (Exception ex)
                {

                }
            }
            else
            {
                msg = "Invalid File";
            }

        }
        else
        {
            msg = "select File";
        }
        return msg + "|" + relativePath;

    }

    public static void DownloadFile(string path, HttpResponse response)
    {
        path = HttpContext.Current.Server.MapPath("~/" + path);

        System.IO.FileInfo file = new System.IO.FileInfo(path);

        if (file.Exists)
        {
            response.ClearContent();
            response.Clear();
            response.ContentType = "application/octet-stream";
            response.AddHeader("Content-Length", file.Length.ToString());
            response.AddHeader("Content-Disposition",
                               "attachment; filename=" + file.Name + ";");
            response.TransmitFile(path);
          
        }
    }

    public enum FolderLocation
    {
        EthicFiles = 1,
        FeasibilityFiles = 2,
        SelectedFiles = 3,
        ContractMgmtUser = 4,
        Regulatory = 5,
        Others = 7,
        Grant = 8
    }

    //public static string[] UpLoadNew(FileUpload fld, FolderLocation location)
    //{

    //    string[] paths = new string[fld.PostedFiles.Count];
    //    if (fld.HasFile)
    //    {
    //        int iUploadedCnt = 0;


    //        for (int i = 0; i < fld.PostedFiles.Count; i++)
    //        {

    //            HttpPostedFile uploadfile = fld.PostedFiles[i];
    //            string fileName = Path.GetFileName(uploadfile.FileName);
    //            string path = HttpContext.Current.Server.MapPath("~/" + location.ToString() + "/" + DateTime.Now.Date.ToString("dd/MM/yyyy").Replace("/", "-"));

    //            string ext = Path.GetExtension(uploadfile.FileName);

    //            string random = Common.GetRandomString();
    //            string fullPath = path + "/" + fileName.Replace(ext, "") + "~" + random + ext;
    //            string Shortpath = location.ToString() + "/" + DateTime.Now.Date.ToString("dd/MM/yyyy").Replace("/", "-") + "/" + fileName.Replace(ext, "") + "~" + random + ext;
    //            if (uploadfile.ContentLength > 0)
    //            {


    //                if (!Directory.Exists(path))
    //                    Directory.CreateDirectory(path);

    //                if (!File.Exists(fullPath))
    //                {
    //                    uploadfile.SaveAs(fullPath);
    //                    paths[i] = Shortpath;
    //                    iUploadedCnt += 1;
    //                }
    //                else
    //                {
    //                    File.Delete(fullPath);
    //                    uploadfile.SaveAs(fullPath);
    //                    paths[i] = Shortpath;
    //                }
    //            }

    //        }
    //        string msg = iUploadedCnt.ToString() + "  Files Upload Successfully..!!";

    //    }
    //    return paths.ToArray();
    //}

    public static void DownloadFileNew(string path, HttpResponse response)
    {
        path = HttpContext.Current.Server.MapPath("~/" + path);

        System.IO.FileInfo file = new System.IO.FileInfo(path);

        if (file.Exists)
        {
            string fileName = file.Name.Split('~')[0] + "." + file.Name.Split('.')[file.Name.Split('.').Length - 1];

            response.ClearContent();
            response.Clear();
            response.ContentType = "application/octet-stream";
            response.AddHeader("Content-Length", file.Length.ToString());
            response.AddHeader("Content-Disposition",
                               "attachment; filename=" + fileName + ";");
            response.TransmitFile(path);

        }
    }


    public static string GetDownloadFilePath(this string path)
    {
        string DownloadPath = "";
        path = HttpContext.Current.Server.MapPath("~/" + path);

        System.IO.FileInfo file = new System.IO.FileInfo(path);

        if (file.Exists)
        {
            DownloadPath = file.Name.Split('~')[0] + "." + file.Name.Split('.')[file.Name.Split('.').Length - 1];
        }
        return DownloadPath;
    }

    public static string[] GetFilesFromStringPathMultiple(string[] filePath, FolderLocation fld)
    {
        string[] paths = new string[filePath.Length];

        if (filePath.Length > 0)
        {
            for (int i = 0; i < filePath.Length; i++)
            {



                string fileName = Path.GetFileName(filePath[i]);
                string path = HttpContext.Current.Server.MapPath("~/" + fld.ToString() + "/" + DateTime.Now.Date.ToString("dd/MM/yyyy").Replace("/", "-"));

                string ext = Path.GetExtension(filePath[i]);

                string random = Common.GetRandomString();
                string fullPath = path + "/" + fileName.Replace(ext, "") + "~" + random + ext;
                string Shortpath = fld.ToString() + "/" + DateTime.Now.Date.ToString("dd/MM/yyyy").Replace("/", "-") + "/" + fileName.Replace(ext, "") + "~" + random + ext;


                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);

                if (!File.Exists(fullPath))
                {
                    File.Copy(filePath[i], fullPath);

                    paths[i] = Shortpath;

                }
                else
                {
                    File.Copy(filePath[i], fullPath);
                    paths[i] = Shortpath;
                }
            }

        }
        return paths;
    }

    public static string GetFileName(this string DbPath)
    {
        string FileName = "";
        DbPath = HttpContext.Current.Server.MapPath("~/" + DbPath);
        System.IO.FileInfo file = new System.IO.FileInfo(DbPath);
        if (file.Exists)
        {
            FileName = file.Name.Split('~')[0] + "." + file.Name.Split('.')[file.Name.Split('.').Length - 1];
        }

        return FileName;

    }

    #region " Project Methods "
    public static void FillCombo(this System.Web.UI.WebControls.DropDownList ddl, DropDownName dname, string Condition = "")
    {
        try
        {

            List<clsDropDown> ddllist = new List<clsDropDown>();
            System.Net.WebClient client = new System.Net.WebClient();
            client.Headers.Add("content-type", "application/json");//set your header here, you can add multiple headers
            string arr = client.DownloadString(string.Format("{0}api/DropDownData/{1}?&param1={2}",HttpContext.Current.Session["WebApiUrl"].ToString(), dname.ToString(), Condition));
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            ddllist = serializer.Deserialize<List<clsDropDown>>(arr);
            ddl.DataSource = ddllist;
            ddl.DataTextField = "DisplayField";
            ddl.DataValueField = "ValueField";
            ddl.DataBind();
            ddl.Items.Insert(0, new ListItem("--Select--", System.Convert.ToString(0)));
        }
        catch (Exception ex)
        { }
    }
    public static void FillComboNew(this System.Web.UI.WebControls.DropDownList ddl, DropDownName dname, string Condition = "")
    {
        //TTSHWCFServiceClient cl = new TTSHWCFServiceClient();
        //try
        //{

        //    List<TTSHWCFReference.clsDropDown> ddllist = cl.GetDropDownData(dname, Condition, "", "", "", "").ToList();
        //    ddl.DataSource = ddllist;
        //    ddl.DataTextField = "DisplayField";
        //    ddl.DataValueField = "ValueField";
        //    ddl.DataBind();
        //    ddl.Items.Insert(0, new ListItem("--Select--", "-1"));
        //}
        //catch
        //{ }
    }
    public static void FillCheckList(this System.Web.UI.WebControls.CheckBoxList chkboxlst, DropDownName dname, string condition = "", string condition1 = "")
    {
        //TTSHWCFServiceClient cl = new TTSHWCFServiceClient();
        //try
        //{

        //    List<TTSHWCFReference.clsDropDown> ddllist = cl.GetDropDownData(dname, condition, condition1, "", "", "").ToList();
        //    chkboxlst.DataSource = ddllist;
        //    chkboxlst.DataTextField = "DisplayField";
        //    chkboxlst.DataValueField = "ValueField";
        //    chkboxlst.DataBind();
        //}
        //catch
        //{ }
    }
    public static void DtReadOnlyAllowNull(this DataTable dt)
    {
        if (dt != null)
        {
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Columns.Count; i++)
                {
                    dt.Columns[i].ReadOnly = false;
                    dt.Columns[i].AllowDBNull = true;
                }
            }
        }
    }
    #endregion
    #region " Email Class "
    public class Email
    {
        public int _Port { get; set; }
        public string _Host { get; set; }
    }
    #endregion

    #region " Methods "
    //public static void EnableAllandClearControl(System.Web.UI.MasterPage ms, bool isEnabled = false, bool IsClear = false, string ContentPageName = "maincontent")
    //	{

    //	foreach ( Control ctrl in ms.Controls )
    //		{
    //		if ( ctrl.HasControls() )
    //			{
    //			foreach ( Control item in ctrl.Controls )
    //				{
    //				if ( item.HasControls() )
    //					{
    //					if ( item.GetType().ToString().ToLower() == "system.web.ui.webcontrols.contentplaceholder" && item.ClientID.ToLower() == ContentPageName )
    //						{
    //						foreach ( Control lst in item.Controls )
    //							{
    //							if ( lst.HasControls() )
    //								{

    //								foreach ( Control child in lst.Controls )
    //									{
    //									if ( child is TextBox )
    //										{
    //										( (TextBox)child ).Enabled = isEnabled;
    //										if ( IsClear )
    //											{
    //											( (TextBox)child ).Text = "";
    //											}
    //										}
    //									if ( child is DropDownList )
    //										{
    //										( (DropDownList)child ).Enabled = isEnabled;
    //										if ( IsClear )
    //											{
    //											( (DropDownList)child ).SelectedIndex = -1;

    //											}
    //										}
    //									if ( child is UpdatePanel )
    //										{
    //										if ( child.HasControls() )
    //											{
    //											foreach ( Control ddl in child.Controls )
    //												{
    //												if ( ddl.HasControls() )
    //													{
    //													foreach ( Control d in ddl.Controls )
    //														{
    //														if ( d is DropDownList )
    //															{
    //															( (DropDownList)d ).Enabled = isEnabled;
    //															if ( IsClear )
    //																{
    //																( (DropDownList)d ).SelectedIndex = -1;

    //																}
    //															}
    //														if ( d is TextBox )
    //															{
    //															( (TextBox)d ).Enabled = isEnabled;
    //															if ( IsClear )
    //																{
    //																( (TextBox)d ).Text = "";
    //																}
    //															}
    //														}
    //													}

    //												}

    //											}
    //										}

    //									}

    //								}
    //							}
    //						}

    //					}

    //				}
    //			}

    //		}

    //	}
    public static object iffBlank(object inpval, object outVal)
    {
        if (Convert.IsDBNull(inpval))
        {
            return outVal;
        }
        else if (Convert.ToString(inpval) == string.Empty)
        {
            return outVal;
        }
        else if (inpval == (object)0)
        {
            return outVal;
        }
        else if (inpval == null)
        {
            return outVal;
        }
        else
        {
            outVal = inpval;
        }
        return outVal;
    }
    public static DataTable dtReadOnlyAndAllowDbNull(this DataTable dt)
    {
        int k = dt.Columns.Count - 1;
        for (int i = 0; i < k; i++)
        {
            dt.Columns[i].ReadOnly = false; dt.Columns[i].AllowDBNull = true;
        }
        return dt;
    }
    public static DataTable ListToDatatable<T>(this List<T> inputlist)
    {
        DataTable dt = new DataTable();
        foreach (PropertyInfo item in typeof(T).GetProperties())
        {
            dt.Columns.Add(new DataColumn(item.Name, item.PropertyType));
        }
        foreach (T t in inputlist)
        {
            DataRow dr = dt.NewRow();
            foreach (PropertyInfo item in typeof(T).GetProperties())
            {
                dr[item.Name] = item.GetValue(t, null);
            }
            dt.Rows.Add(dr);

        }
        return dt;
    }
    public static string DataTableToJsonObj(this DataTable dt)
    {
        DataSet ds = new DataSet();
        ds.Merge(dt);
        StringBuilder JsonString = new StringBuilder();
        if (ds != null && ds.Tables[0].Rows.Count > 0)
        {
            JsonString.Append("[");
            int rowct = 0; int colct = 0;
            rowct = ds.Tables[0].Rows.Count;
            for (int i = 0; i < rowct; i++)
            {
                JsonString.Append("{");
                colct = ds.Tables[0].Columns.Count;
                for (int j = 0; j < colct; j++)
                {
                    if (j < colct - 1)
                    {
                        JsonString.Append("\"" + ds.Tables[0].Columns[j].ColumnName.ToString() + "\":" + "\"" + ds.Tables[0].Rows[i][j].ToString() + "\",");
                    }
                    else if (j == colct - 1)
                    {
                        JsonString.Append("\"" + ds.Tables[0].Columns[j].ColumnName.ToString() + "\":" + "\"" + ds.Tables[0].Rows[i][j].ToString() + "\"");
                    }
                }
                if (i == rowct - 1)
                {
                    JsonString.Append("}");
                }
                else
                {
                    JsonString.Append("},");
                }
            }
            JsonString.Append("]");
            return JsonString.ToString();
        }
        else
        {
            return null;
        }
    }
    public static bool SendMail(string _EmailTo, string _Emailfrom, string _Subject, string _body)
    {
        try
        {
            SmtpClient client = new SmtpClient();
            List<Email> _EmailList = GetEmailHostPort(_Emailfrom);

            client.Port = _EmailList[0]._Port;
            client.Host = _EmailList[0]._Host;
            client.EnableSsl = true;
            client.Timeout = (client.Host.ToLower() == "smtp.office365.com") ? 200000 : 10000;

            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential(_Emailfrom, "****password");
            MailMessage _MailMessage = new MailMessage();
            _MailMessage.From = new MailAddress(_Emailfrom);

            /*********** Put below line in loop if you want to have multiple recipients ***********/
            _MailMessage.To.Add(new MailAddress(_EmailTo));
            /**************************************************************************************/
            _MailMessage.Subject = _Subject;
            _MailMessage.Body = _body;
            _MailMessage.IsBodyHtml = true;
            _MailMessage.Priority = MailPriority.High;
            _MailMessage.BodyEncoding = UTF8Encoding.UTF8;
            _MailMessage.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
            client.Send(_MailMessage);
        }
        catch { return false; }
        return true;
    }
    public static List<Email> GetEmailHostPort(string _EmailFrom)
    {
        string _HostPort = string.Empty;
        Email em = new Email();
        List<Email> lst = new List<Email>();
        try
        {
            string _domain = _EmailFrom.Substring(_EmailFrom.LastIndexOf('@') + 1).Split(new char[] { '.' }, StringSplitOptions.RemoveEmptyEntries)[0];
            switch (_domain.Trim().ToLower())
            {
                case "gmail":
                    em._Port = 587;
                    em._Host = "smtp.gmail.com";
                    break;
                case "mail":
                    em._Port = 465; // or 995
                    em._Host = "smtp.mail.com";
                    break;
                case "yahoo":
                    em._Port = 465;// or 995
                    em._Host = "smtp.mail.yahoo.com";
                    break;
                case "office365":
                case "rgensolutions":
                    em._Port = 587;// or 995
                    em._Host = "smtp.office365.com";
                    break;
                case "outlook":
                case "hotmail":
                case "live":
                    em._Port = 587;
                    em._Host = "smtp.live.com";
                    break;
                default:
                    em._Port = 587;
                    em._Host = "smtp.gmail.com";
                    break;
            }
        }
        catch
        {


        }
        lst.Add(em);
        return lst;

    }
    public static string ConverMode(this string HdnMode)
    {
        string mode = "Insert";
        switch (HdnMode.ToLower())
        {
            case "cmdedit":
                mode = "Update";
                break;
            case "cmddelete":
                mode = "Delete";
                break;
            case "cmdview":
                mode = "View";
                break;
            case "cmdadd":
                mode = "Insert";
                break;
            default:
                mode = "Select";
                break;
        }
        return mode;
    }
    public static void FillCheckList(this CheckBoxList chklist, DataTable dt, string sTextFeild, string sValueFeild, bool IsReqALL = false)
    {

        chklist.Items.Clear();
        chklist.DataSource = dt;
        chklist.DataTextField = sTextFeild;
        chklist.DataValueField = sValueFeild;
        chklist.DataBind();

    }
    public static string SetReplace(string strValue)
    {
        return strValue.ToString().Replace("'", "`");
    }
    public static string GetReplace(string strValue)
    {
        return strValue.ToString().Replace("`", "'");
    }

    public static string SetCurrentDate()
    {
        string date = DateTime.Now.Date.ToString("dd/MM/yyyy");
        string[] datesArr = date.Split(new char[] { '-', '/' }, StringSplitOptions.RemoveEmptyEntries);
        var d = datesArr[0];
        var m = datesArr[1];
        var y = datesArr[2];
        date = d + "-" + ReturnMonth(Convert.ToInt32(m)) + "-" + y;
        return date;
    }
    public static string ReturnMonth(int count)
    {
        string monthname = "";
        string[] month = new string[13];
        month[1] = "Jan";
        month[2] = "Feb";
        month[3] = "Mar";
        month[4] = "Apr";
        month[5] = "May";
        month[6] = "Jun";
        month[7] = "Jul";
        month[8] = "Aug";
        month[9] = "Sep";
        month[10] = "Oct";
        month[11] = "Nov";
        month[12] = "Dec";

        for (var i = 1; i < month.Length; i++)
        {
            if (count == i)
            {
                monthname = month[i];
                break;
            }
        }
        return monthname;
    }
    public static string GetRandomString()
    {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var random = new Random();
        var result = new string(
            Enumerable.Repeat(chars, 3)
                      .Select(s => s[random.Next(s.Length)])
                      .ToArray());
        return result.ToString();

    }
    public static string GetServiceUrl()
    {
        ClientSection clientSection = (ClientSection)WebConfigurationManager.GetSection("system.serviceModel/client");
        ChannelEndpointElement endpoint = clientSection.Endpoints[0];
        string address = endpoint.Address.ToString();
        return address.Substring(0, address.LastIndexOf("/"));
    }
    #endregion

    #region " Conversion Methods "
    public static string ConvertDatetoString(string date, char splittype)
    {
        string[] ArrFDaTe = date.ToString().Split(splittype);
        string frmDaTe = ArrFDaTe[2].ToString();
        if (ArrFDaTe[1].ToString().Length == 2)
            frmDaTe = frmDaTe + ArrFDaTe[1].ToString();
        else
            frmDaTe = frmDaTe + "0" + ArrFDaTe[1].ToString();
        if (ArrFDaTe[0].ToString().Length == 2)
            frmDaTe = frmDaTe + ArrFDaTe[0].ToString();
        else
            frmDaTe = frmDaTe + "0" + ArrFDaTe[0].ToString();
        return frmDaTe;
    }
    public static DateTime ConvertToDateTime(string Date)
    {
        DateTime dtDate;
        try
        {
            string[] MDate = Date.Split(new char[] { '/', '-' }, StringSplitOptions.RemoveEmptyEntries);
            string Days = MDate[0];
            string Months = MDate[1];
            string Year = MDate[2];
            if (Days.Trim().Length == 1)
                Days = "0" + Days;
            if (Months.Trim().Length == 1)
                Months = "0" + Months;
            if (Year.Trim().Length <= 2)
                Year = Convert.ToString((Convert.ToInt32(DateTime.Now.ToString().Substring(0, 1)) * 1000) + Convert.ToInt32(Year));
            dtDate = new DateTime(Convert.ToInt32(Year), Convert.ToInt32(Months), Convert.ToInt32(Days));

        }
        catch (Exception ex)
        {
            return (new DateTime(1900, 01, 01));
            throw ex;
        }
        return dtDate;
    }
    public static string ConvertToStringDate(string Date)
    {
        string dtDate;
        try
        {
            string[] MDate = Date.Split(new char[] { '/', '-' }, StringSplitOptions.RemoveEmptyEntries);
            string Days = MDate[0];
            string Months = MDate[1];
            string Year = MDate[2];
            if (Days.Trim().Length == 1)
                Days = "0" + Days;
            if (Months.Trim().Length == 1)
                Months = "0" + Months;
            if (Year.Trim().Length <= 2)
                Year = Convert.ToString((Convert.ToInt32(DateTime.Now.ToString().Substring(0, 1)) * 1000) + Convert.ToInt32(Year));
            dtDate = Convert.ToString(Year) + "/" + Convert.ToString(Months) + "/" + Convert.ToString(Days);

        }
        catch (Exception ex)
        {
            return ("1900/01/01");
            throw ex;
        }
        return dtDate;
    }
    public static DateTime ConvertSqlDateToDatetime(string date)
    {
        DateTime newdate;
        try
        {
            newdate = DateTime.ParseExact(date, "yyyyMMdd", CultureInfo.InvariantCulture);
        }
        catch (Exception ex)
        {
            return (new DateTime(1900, 01, 01));
        }
        return newdate;
    }
    #endregion

    #region " SetIndex Methods on GridView "
    public static void SetEntryGridViewPageIndex(ref GridView gv, DataTable dt, string filter)
    {
        try
        {
            if (dt != null)
            {
                if (dt.Rows.Count > 0)
                {
                    int pageSize = gv.PageSize;
                    if (dt.Rows.Count > pageSize)
                    {
                        DataRow[] dr = dt.Select(filter);
                        DataRow newRow = dt.NewRow();
                        newRow.ItemArray = dr[0].ItemArray;
                        dt.Rows.Remove(dr[0]);
                        dt.Rows.InsertAt(newRow, gv.PageSize * gv.PageIndex);
                    }
                }
            }
        }
        catch
        {

        }
    }
    public static void SetGridViewPageIndex(ref GridView gv, DataTable dt, string SearchName, string SearchValue)
    {
        try
        {
            if (dt != null)
            {
                if (dt.Rows.Count > 0)
                {
                    int pageSize = gv.PageSize;
                    if (dt.Rows.Count > pageSize)
                    {
                        DataRow[] dr = dt.Select(SearchName + "='" + SearchValue.Replace("'", "`").Trim() + "'");
                        DataRow newRow = dt.NewRow();
                        newRow.ItemArray = dr[0].ItemArray;
                        dt.Rows.Remove(dr[0]);
                        dt.Rows.InsertAt(newRow, 0);
                        gv.PageIndex = 0;
                    }
                }
            }
        }
        catch
        {
        }
    }
    #endregion

    #region " Execute Function "

    #endregion

    #region "New Function"
    public static void CallJs(this Page pg, string FuncName)
    {
        ScriptManager.RegisterClientScriptBlock(pg, pg.GetType(), "showMsg", FuncName.ToString(), true);
    }
    public static void PopUpMsg(this Page pg, string msg, string funcName)
    {
        ScriptManager.RegisterClientScriptBlock(pg, pg.GetType(), "showMsg", "javascript:MessageBoxEvent('" + msg + "','" + funcName + "')", true);

    }
    public static void MsgBox(this Page pg, string msg)
    {
        ScriptManager.RegisterClientScriptBlock(pg, pg.GetType(), "showMsg", "javascript:MessageBox('" + msg + "')", true);
    }
    public static bool CheckInt(this string Input)
    {
        int i = 0;
        if (int.TryParse(Input, out i))
        {
            return true;
        }
        return false;
    }
    public static void EnableAllandClearControl(System.Web.UI.MasterPage ms, bool isEnabled = false, bool IsClear = false, string ContentPageName = "maincontent")
    {

        foreach (Control ctrl in ms.Controls)
        {
            if (ctrl.HasControls())
            {
                foreach (Control item in ctrl.Controls)
                {
                    if (item.HasControls())
                    {
                        if (item.GetType().ToString().ToLower() == "system.web.ui.webcontrols.contentplaceholder" && item.ClientID.ToLower() == ContentPageName)
                        {
                            foreach (Control lst in item.Controls)
                            {
                                if (lst.HasControls())
                                {

                                    foreach (Control child in lst.Controls)
                                    {
                                        if (child is TextBox)
                                        {
                                            ((TextBox)child).Enabled = isEnabled;
                                            if (IsClear)
                                            {
                                                ((TextBox)child).Text = "";
                                            }
                                        }
                                        if (child is DropDownList)
                                        {
                                            ((DropDownList)child).Enabled = isEnabled;
                                            if (IsClear)
                                            {
                                                ((DropDownList)child).SelectedIndex = -1;

                                            }
                                        }
                                        if (child is CheckBoxList)
                                        {
                                            CheckBoxList chk = (CheckBoxList)child;
                                            foreach (ListItem items in chk.Items)
                                            {
                                                items.Selected = false;
                                            }
                                        }
                                        if (child is UpdatePanel)
                                        {
                                            if (child.HasControls())
                                            {
                                                foreach (Control ddl in child.Controls)
                                                {
                                                    if (ddl.HasControls())
                                                    {
                                                        foreach (Control d in ddl.Controls)
                                                        {
                                                            if (d is DropDownList)
                                                            {
                                                                ((DropDownList)d).Enabled = isEnabled;
                                                                if (IsClear)
                                                                {
                                                                    ((DropDownList)d).SelectedIndex = -1;

                                                                }
                                                            }
                                                            if (d is TextBox)
                                                            {
                                                                ((TextBox)d).Enabled = isEnabled;
                                                                if (IsClear)
                                                                {
                                                                    ((TextBox)d).Text = "";
                                                                }
                                                            }
                                                        }
                                                    }

                                                }

                                            }
                                        }

                                    }

                                }
                            }
                        }

                    }

                }
            }

        }

    }
    public static string[] GetFilesFromStringPath(string filePath, FolderLocation fld)
    {
        string[] paths = new string[1];

        try
        {
            if (filePath != "")
            {
                for (int i = 0; i < 1; i++)
                {

                    if (filePath.Contains("Could not find file"))
                    {
                        filePath = filePath.Replace("Could not find file", "").TrimEnd('.');

                    }

                    string fileName = Path.GetFileName(filePath);


                    string path = HttpContext.Current.Server.MapPath("~/" + fld.ToString() + "/" + DateTime.Now.Date.ToString("dd/MM/yyyy").Replace("/", "-"));

                    string ext = Path.GetExtension(filePath);

                    string random = Common.GetRandomString();
                    string fullPath = path + "/" + fileName.Replace(ext, "") + "~" + random + ext;
                    string Shortpath = fld.ToString() + "/" + DateTime.Now.Date.ToString("dd/MM/yyyy").Replace("/", "-") + "/" + fileName.Replace(ext, "") + "~" + random + ext;


                    if (!Directory.Exists(path))
                        Directory.CreateDirectory(path);

                    if (!File.Exists(fullPath))
                    {
                        File.Copy(filePath, fullPath);

                        paths[i] = Shortpath;

                    }
                    else
                    {
                        File.Copy(filePath, fullPath);
                        paths[i] = Shortpath;
                    }
                }

            }
        }
        catch (Exception ex)
        {


        }
        return paths;
    }
    #endregion
}