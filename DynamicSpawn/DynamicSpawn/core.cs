using System.Collections.Generic;
using System.IO;
using System.Web.Helpers;
using System.Text.RegularExpressions;

class Program{
	static void init(){
		if(core(true)!=true){
			Process.Start(GetDefaultBrowserPath(),url+"?path="+Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location).Replace(@"\","/"));
			//https://stackoverflow.com/questions/52797/how-do-i-get-the-path-of-the-assembly-the-code-is-in
			Console.WriteLine("Press enter to continue");
			Console.ReadLine();
		}
	}
}

static void run(){
	if(core()!=true){
		Console.WriteLine("Press enter to continue (`r` to reset)");
		var string r=Console.ReadLine();
		new Regex(@"^\s*r\s*$","i").IsMatch(r)?init():run();
	}
}

static bool core(bool first){
	var files=GetFiles("dungeons",".json.patch");
	var jsons=GetFiles("/",".DyS.json");
	if(jsons.Length>1){
		Console.Write("Multiple .Dys.json files found");
		for(int file in jsons){
			Console.WriteLine(file," : ",jsons[file],"\n");
		}
		Console.WriteLine("Select file with number");
		jsons=jsons[Console.ReadLine()];
	}
	else if(jsons.Length<1){
		if(first==false){
			Console.Error.WriteLine("No .DyS.json files found");
		}
		return;
	}
	else{
		jsons=jsons[0];
	}
	var json=Decode(File.ReadAllText(jsons));
	foreach(string file in files){
		var text=File.ReadAllText(file);
		foreach(string key in json){
			text.Replace(key,json[key]);
		}
		File.WriteAllText(file,text);
	}
	return true;
}

static IEnumerable<string> GetFiles(string path,string extension){
//https://stackoverflow.com/questions/929276/how-to-recursively-list-all-the-files-in-a-directory-in-c
	Queue<string> queue=new Queue<string>();
	queue.Enqueue(path);
	while(queue.Count>0){
		path=queue.Dequeue();
		try{
			foreach(string subDir in Directory.GetDirectories(path)){
				queue.Enqueue(subDir);
			}
		}
		catch(Exception ex){
			Console.Error.WriteLine(ex);
		}
		string[] files=null;
		try{
			files=Directory.GetFiles(path,extension);
		}
		catch(Exception ex){
			Console.Error.WriteLine(ex);
		}
		if(files!=null){
			for(int i=0;i<files.Length;i++){
				yield return files[i];
			}
		}
	}
}

public static string GetDefaultBrowserPath(){
	//http://www.seirer.net/blog/2014/6/10/solved-how-to-open-a-url-in-the-default-browser-in-csharp
	string uA=@"Software\Microsoft\Windows\Shell\Associations\UrlAssociations\http";
	string bPK=@"$BROWSER$\shell\open\command";
	RegistryKey uCK=null;
	string bP="";
	try{
		//Read default browser path from userChoiceLKey
		uCK=Registry.CurrentUser.OpenSubKey(uA+@"\UserChoice",false);
		//Try machine default
		if(uCK==null){
			var bK=Registry.ClassesRoot.OpenSubKey(@"HTTP\shell\open\command",false);
			if(bK==null){
				bK=Registry.CurrentUser.OpenSubKey(uA,false);
			}
			var p=cP(bK.GetValue(null) as string);
			bK.Close();
			return p;
		}
		else{
			string progId=(uCK.GetValue("ProgId").ToString());
			uCK.Close();
			string cBk=bPK.Replace("$BROWSER$",progId);
			var kp=Registry.ClassesRoot.OpenSubKey(cBk,false);
			bP=cP(kp.GetValue(null) as string);
			kp.Close();
			return bP;
		}
	}catch(Exception ex){
		return "";
	}
}

private static string cP(string p){
	string[] url=p.Split('"',2);
	return url[1]
}