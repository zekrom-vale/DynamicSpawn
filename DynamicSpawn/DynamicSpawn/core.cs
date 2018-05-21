using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using Microsoft.Win32;

internal class Program{
    private static void Main(){
		if(!Core(true)){
            string url="file:///C:/Program%20Files%20(x86)/Steam/steamapps/common/Starbound/mymods/DynamicSpawn/DynamicSpawn/index.html";
            string path=url+"?path="+Uri.EscapeDataString(System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetEntryAssembly().Location));

            System.Diagnostics.Process.Start(GetDefaultBrowserPath(),path);
			//https://stackoverflow.com/questions/52797/how-do-i-get-the-path-of-the-assembly-the-code-is-in
			Console.WriteLine("Press enter to continue");
			Console.ReadLine();
		}
	}

    private static void Run(){
        if (!Core(false)){
            Console.WriteLine("Press enter to continue (`r` to reset)");
            string r=Console.ReadLine();
            if (new Regex(@"^\s*r\s*$").IsMatch(r)) Main();
            else Run();
        }
    }

    private static bool Core(bool first){
        string[] jsons=GetAllFiles("",".DyS.json");
        string j="";
        if(jsons.Length>1){
            Console.Write("Multiple .Dys.json files found");
            foreach(string i in jsons) Console.WriteLine(" : ", i, "\n");
            //Not sure
            Console.WriteLine("Select file with number");
            int input=Int32.Parse(Console.ReadLine());
            j=jsons[input];
        }
        else if(jsons.Length<1){
            if(first==false)Console.Error.WriteLine("No .DyS.json files found");
            return false;
        }
        else j=jsons[0];
        var json= Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, string>>(File.ReadAllText(j));
        //Decode(File.ReadAllText(j));

        string[] files=GetAllFiles("dungeons",".json.patch");
        foreach(string f in files){
            string text=File.ReadAllText(f);
            foreach(KeyValuePair<string,string>js in json){
                text.Replace(oldValue:js.Key,newValue:js.Value);
            }

            File.WriteAllText(f,text);
        }
        return true;
    }
    public static IEnumerable<string> GetFiles(string path, string extension){
        //https://stackoverflow.com/questions/929276/how-to-recursively-list-all-the-files-in-a-directory-in-c
        Queue<string> queue = new Queue<string>();
        queue.Enqueue(path);
        while (queue.Count > 0){
            path = queue.Dequeue();
            try{
                foreach (string d in Directory.GetDirectories(path)) queue.Enqueue(d);
            }
            catch (Exception ex){
                Console.Error.WriteLine(ex);
            }
            string[] files = null;
            try{
                files = Directory.GetFiles(path, extension);
            }
            catch (Exception ex){
                Console.Error.WriteLine(ex);
            }
            if (files != null) for (int i = 0; i < files.Length; i++) yield return files[i];
        }
    }

    public static string[] GetAllFiles(string path, string extension){
        string[] arr={};
        int i=0;
        foreach(string f in GetFiles(path, extension)) arr[i++]=f;
        return arr;
    }

    public static string GetDefaultBrowserPath(){
        //http://www.seirer.net/blog/2014/6/10/solved-how-to-open-a-url-in-the-default-browser-in-csharp
        string uA = @"Software\Microsoft\Windows\Shell\Associations\UrlAssociations\http";
        string bPK = @"$BROWSER$\shell\open\command";
        RegistryKey uCK = null;
        string bP = "";
        try{
            //Read default browser path from userChoiceLKey
            uCK = Registry.CurrentUser.OpenSubKey(uA + @"\UserChoice", false);
            //Try machine default
            if (uCK == null){
                var bK = Registry.ClassesRoot.OpenSubKey(@"HTTP\shell\open\command", false);
                if (bK == null){
                    bK = Registry.CurrentUser.OpenSubKey(uA, false);
                }
                string p = CP(bK.GetValue(null) as string);
                bK.Close();
                return p;
            }
            else{
                string progId = (uCK.GetValue("ProgId").ToString());
                uCK.Close();
                string cBk = bPK.Replace("$BROWSER$", progId);
                var kp = Registry.ClassesRoot.OpenSubKey(cBk, false);
                bP = CP(kp.GetValue(null) as string);
                kp.Close();
                return bP;
            }
        }
        catch(Exception){
            return "";
        }
    }

    private static string CP(string p){
        string[] url = p.Split('"');
        return url[1];
    }
}