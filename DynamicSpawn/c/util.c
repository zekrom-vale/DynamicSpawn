#define PCRE2_CODE_UNIT_WIDTH 8
#include <emscripten/emscripten.h>
#include <stdio.h>
#include <math.h>
#include <regex.h>
#include <string.h>
#include <pcre2.h>
#include <stdbool.h>

#ifdef __cplusplus
extern "C"{
#endif
	extern bool EMSCRIPTEN_KEEPALIVE exists(char* value,int v,char* HTML,char* val,char* author,char* mod){
		return (v==0||v==1||v==1.5)&&e(HTML,value)||(v==0||v==2||v==1.5)&&e(val,value)||(v==0||v==4)&&e(author,value)||(v==0||v==3)&&e(mod,value);
	}
	bool EMSCRIPTEN_KEEPALIVE e(char* txt,char* val){
		return EM_ASM_BOOL({
			return $0?$0.toLowerCase().indexOf($1)>-1:false;
		},txt,val);
	}
	extern bool EMSCRIPTEN_KEEPALIVE existsReg(char* value,int v,char* HTML,char* val,char* author,char* mod){
		return (v==0||v==1||v==1.5)&&eR(HTML,value)||(v==0||v==2||v==1.5)&&eR(val,value)||(v==0||v==4)&&eR(author,value)||(v==0||v==3)&&eR(mod,value);
	}
	bool EMSCRIPTEN_KEEPALIVE eR(char* txt,char* val){
		return EM_ASM_BOOL({
			return $1.test(new RegExp($0,"ig"));
		},txt,val);
	}
#ifdef __cplusplus
}
#endif