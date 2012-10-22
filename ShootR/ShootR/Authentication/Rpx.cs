//C# Helper Class for Janrain Engage
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Xml;
using System.Xml.XPath;

public class Rpx
{
    private string apiKey;
    private string baseUrl;
    public Rpx(string apiKey, string baseUrl)
    {
        while (baseUrl.EndsWith("/"))
            baseUrl = baseUrl.Substring(0, baseUrl.Length - 1);
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
    public string getApiKey() { return apiKey; }
    public string getBaseUrl() { return baseUrl; }
    public XmlElement AuthInfo(string token)
    {
        Dictionary<string, string> query = new Dictionary<string, string>();
        query.Add("token", token);
        return ApiCall("auth_info", query);
    }
    public List<string> Mappings(string primaryKey)
    {
        Dictionary<string, string> query = new Dictionary<string, string>();
        query.Add("primaryKey", primaryKey);
        XmlElement rsp = ApiCall("mappings", query);
        XmlElement oids = (XmlElement)rsp.FirstChild;
        List<string> result = new List<string>();
        for (int i = 0; i < oids.ChildNodes.Count; i++)
        {
            result.Add(oids.ChildNodes[i].InnerText);
        }
        return result;
    }
    public Dictionary<string, ArrayList> AllMappings()
    {
        Dictionary<string, string> query = new Dictionary<string, string>();
        XmlElement rsp = ApiCall("all_mappings", query);
        Dictionary<string, ArrayList> result = new Dictionary<string, ArrayList>();
        XPathNavigator nav = rsp.CreateNavigator();
        XPathNodeIterator mappings = (XPathNodeIterator)nav.Evaluate("/rsp/mappings/mapping");
        foreach (XPathNavigator m in mappings)
        {
            string remote_key = GetContents("./primaryKey/text()", m);
            XPathNodeIterator ident_nodes = (XPathNodeIterator)m.Evaluate("./identifiers/identifier");
            ArrayList identifiers = new ArrayList();
            foreach (XPathNavigator i in ident_nodes)
            {
                identifiers.Add(i.ToString());
            }
            result.Add(remote_key, identifiers);
        }
        return result;
    }
    private string GetContents(string xpath_expr, XPathNavigator nav)
    {
        XPathNodeIterator rk_nodes = (XPathNodeIterator)nav.Evaluate(xpath_expr);
        while (rk_nodes.MoveNext())
        {
            return rk_nodes.Current.ToString();
        }
        return null;
    }
    public void Map(string identifier, string primaryKey)
    {
        Dictionary<string, string> query = new Dictionary<string, string>();
        query.Add("identifier", identifier);
        query.Add("primaryKey", primaryKey);
        ApiCall("map", query);
    }
    public void Unmap(string identifier, string primaryKey)
    {
        Dictionary<string, string> query = new Dictionary<string, string>();
        query.Add("identifier", identifier);
        query.Add("primaryKey", primaryKey);
        ApiCall("unmap", query);
    }
    private XmlElement ApiCall(string methodName, Dictionary<string, string> partialQuery)
    {
        Dictionary<string, string> query = new Dictionary<string, string>(partialQuery);
        query.Add("format", "xml");
        query.Add("apiKey", apiKey);
        StringBuilder sb = new StringBuilder();
        foreach (KeyValuePair<string, string> e in query)
        {
            if (sb.Length > 0)
            {
                sb.Append('&');
            }
            sb.Append(System.Web.HttpUtility.UrlEncode(e.Key, Encoding.UTF8));
            sb.Append('=');
            sb.Append(HttpUtility.UrlEncode(e.Value, Encoding.UTF8));
        }
        string data = sb.ToString();
        Uri url = new Uri(baseUrl + "/api/v2/" + methodName);
        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
        request.Method = "POST";
        request.ContentType = "application/x-www-form-urlencoded";
        request.ContentLength = data.Length;
        // Write the request
        StreamWriter stOut = new StreamWriter(request.GetRequestStream(),
                                              Encoding.ASCII);
        stOut.Write(data);
        stOut.Close();
        HttpWebResponse response = (HttpWebResponse)request.GetResponse();
        Stream dataStream = response.GetResponseStream();
        XmlDocument doc = new XmlDocument();
        doc.PreserveWhitespace = false;
        doc.Load(dataStream);
        XmlElement resp = doc.DocumentElement;
        if (resp == null || !resp.GetAttribute("stat").Equals("ok"))
        {
            throw new Exception("Unexpected API error");
        }
        return resp;
    }
    public static void Main(string[] args)
    {
        Rpx r = new Rpx(args[0], args[1]);
        if (args[2].Equals("mappings"))
        {
            Console.WriteLine("Mappings for " + args[3] + ":");
            foreach (string s in r.Mappings(args[3]))
            {
                Console.WriteLine(s);
            }
        }
        if (args[2].Equals("all_mappings"))
        {
            Console.WriteLine("All mappings:");
            foreach (KeyValuePair<string, ArrayList> pair in r.AllMappings())
            {
                Console.WriteLine(pair.Key + ":");
                foreach (string identifier in pair.Value)
                {
                    Console.WriteLine("  " + identifier);
                }
            }
        }
        if (args[2].Equals("map"))
        {
            Console.WriteLine(args[3] + " mapped to " + args[4]);
            r.Map(args[3], args[4]);
        }
        if (args[2].Equals("unmap"))
        {
            Console.WriteLine(args[3] + " unmapped from " + args[4]);
            r.Unmap(args[3], args[4]);
        }
    }
}