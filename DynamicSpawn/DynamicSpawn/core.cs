using System;
using System.Text.RegularExpressions;
//(c) zekrom_vale
internal class Program{
    private static void Main(){
		if(!Core(true)){
            string path="file:///C:/Program%20Files%20(x86)/Steam/steamapps/common/Starbound/mymods/DynamicSpawn/DynamicSpawn/index.html?path="+Uri.EscapeDataString(Location);
            System.Diagnostics.Process.Start(DefaultBrowserPath,path);
            Console.Clear();
            Console.ForegroundColor=ConsoleColor.Yellow;
            Console.WriteLine("Once you have Exported the JSON file\nPress any key to continue");
            Console.ResetColor();
			Console.ReadKey();
            Run();
		}
	}

    private static void Run(){
        if(!Core()){
            Console.ForegroundColor=ConsoleColor.Yellow;
            Console.WriteLine("Press any key to continue (`r` to reset)");
            Console.ResetColor();
            if(Console.ReadKey().KeyChar=='r')Main();
            else Run();
        }
    }

    private static bool Core(bool first=false){
        string path=Location,
            j="";
        UInt16 n;
        string[]jsons=GetAllFiles(path,"*.DyS.cosv");
        if(jsons.Length>1){
            Console.Write("Multiple .Dys.cosv files found");
            n=1;
            Console.ForegroundColor=ConsoleColor.Cyan;
            foreach(string i in jsons)Console.WriteLine("{0}: {1}\n",new dynamic[]{n++,i});
            Console.ForegroundColor=ConsoleColor.Yellow;
            Console.WriteLine("Select file with number");
            j=jsons[UInt16.Parse(Console.ReadLine())-1];
        }
        else if(jsons.Length<1){
            if(!first){
                Console.ForegroundColor=ConsoleColor.Red;
                Console.Error.WriteLine("No .DyS.cosv files found");
                Console.ResetColor();
            }
            return false;
        }
        else j=jsons[0];
        string[]nvs=System.IO.File.ReadAllText(j).Split(new char[]{'\n'}),
            files=GetAllFiles("dungeons","*.json.patch"),
            val=new string[nvs.Length];
        Regex[] regs=new Regex[nvs.Length];
        int _l=files.Length;
        UInt16 I=1;
        n=0;
        foreach(string v in nvs){
            string[]vs=v.Split(new char[]{':'},2);
            regs[n]=new Regex(@"""([^\\""]|\\.)*""\s*\/\/#"+vs[0]);
            val[n++]=vs[1]+@"//#"+vs[0];
            Console.WriteLine(regs[n-1]);
            Console.WriteLine(val[n-1]);
        }
        Console.ForegroundColor=ConsoleColor.Cyan;
        foreach(string f in files){
            Console.Clear();
            Console.WriteLine("{0} of {1}  {2}\n",new dynamic[]{I++,_l,f});
            string txt=System.IO.File.ReadAllText(f);
            n=0;
            foreach(string v in nvs)txt=regs[n].Replace(input:txt,replacement:val[n++]);
            //Console.Write(txt);
            System.IO.File.WriteAllText(f,txt);
        }
        Console.ForegroundColor=ConsoleColor.Green;
        Console.WriteLine("Replacment Operation Compleated");
        return true;
    }

    public static string[]GetAllFiles(string path,string extension)=>System.IO.Directory.GetFiles(path,extension,System.IO.SearchOption.AllDirectories);
    private static string Location{
        get{
            string path=System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetEntryAssembly().Location);
            return new Regex(@"^[a-z]:(\\|\/)(\$[^\\\/]*|Temp|Recovery|Windows|Users|ProgramData|System Volume Information|Intel|PerfLogs)(\\|\/)").IsMatch(path)?"System Path":path;
        }
    }

    public static string DefaultBrowserPath{get{
        Microsoft.Win32.RegistryKey uCK=null;
        string bP="";
        try{
            //http://www.seirer.net/blog/2014/6/10/solved-how-to-open-a-url-in-the-default-browser-in-csharp
            string uA=@"Software\Microsoft\Windows\Shell\Associations\UrlAssociations\http";
            //From userChoiceLKey
            uCK=Microsoft.Win32.Registry.CurrentUser.OpenSubKey(uA+@"\UserChoice",false);
            //Machine default
            if(uCK==null){
               Microsoft.Win32.RegistryKey bK=Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(@"HTTP\shell\open\command",false);
                if(bK==null)bK=Microsoft.Win32.Registry.CurrentUser.OpenSubKey(uA,false);
                string p=CP(bK.GetValue(null)as string);
                bK.Close();
                return p;
            }
            else{
                string progId=(uCK.GetValue("ProgId").ToString());
                uCK.Close();
                Microsoft.Win32.RegistryKey kp=Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(@"$BROWSER$\shell\open\command".Replace("$BROWSER$",progId),false);
                bP=CP(kp.GetValue(null)as string);
                kp.Close();
                return bP;
            }
        }
        catch(Exception){return"";}
    }}
    private static string CP(string p)=>p.Split('"')[1];
}