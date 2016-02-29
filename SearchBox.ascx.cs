using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class TTSHMasterPage_SearchBox : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    public event EventHandler ButtonSearchClick;
    public event EventHandler ButtonClearClick;
    public event EventHandler ButtonExportClick;


    public enum FilterCriteria { FEASIBALITY, ETHICS, SELECTED, REGULATORY, GRANT, CONTRACT, ALLPROJECTS, CONTRACT_MGMT, Grant_Master }

    public FilterCriteria SearchFilterCriteria
    {
        get;
        set;
    }

    private string _InputString = string.Empty;
    public string SearchInputValue
    {
        get { return _InputString; }
        set { _InputString = value.Trim(); }
    }

    private string _ErrorString = string.Empty;
    public string ErrorString
    {
        get { return _ErrorString; }
    }

   
    protected void btnSearch_Click(object sender, ImageClickEventArgs e)
    {
        try
        {
         
            SearchInputValue = txtSearch.Text;
            searchText();
            ButtonSearchClick(sender, e);
            // hidCnt.Value = "";
        }
        catch (Exception ex)
        {

        }
    }

    protected void btnClear_Click(object sender, EventArgs e)
    {
        try
        {
            clearSearch();
            ButtonClearClick(sender, e);
        }
        catch (Exception ex)
        {

        }

    }

    public void searchText()
    {

    }

    public void clearSearch()
    {
        txtSearch.Text = "";
        SearchInputValue = "";
        lblErr.Text = "";
        
    }

    public void setFocus()
    {
        txtSearch.Focus();
    }

    protected void btnExport_Click(object sender, EventArgs e)
    {
        try
        {
            _ErrorString = "Not Implemented";
            ButtonExportClick(sender, e);
        }
        catch (Exception ex)
        {

        }
    }
}