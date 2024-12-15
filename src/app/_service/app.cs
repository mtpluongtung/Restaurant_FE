string text = "";
try
{
	string text2 = GClass7.smethod_31("ewogICAgImNsaWVudEtleSI6ICJ7YXBpX2tleX0iLAogICAgInRhc2siOiB7CiAgICAgICAgInR5cGUiOiJGdW5DYXB0Y2hhVGFza1Byb3h5TGVzcyIsCiAgICAgICAgIndlYnNpdGVVUkwiOiJodHRwczovL3R3aXR0ZXIuY29tL2FjY291bnQvYWNjZXNzIiwKICAgICAgICAid2Vic2l0ZVB1YmxpY0tleSI6IjAxNTJCNEVCLUQyREMtNDYwQS04OUExLTYyOTgzOEI1MjlDOSIsCiAgICAgICAgImRhdGEiOiAiIiAKICAgIH0KfQ==");
	text2 = text2.Replace("{api_key}", D52D988B);
	string text3 = new GClass10("", "", C3B85089, 0).F38A9A06("https://api.capsolver.com/createTask", text2, "application/json");
	JObject jObject = JObject.Parse(text3);
	if (jObject["errorId"]!.ToString() == "0")
	{
		string newValue = jObject["taskId"]!.ToString();
		for (int i = 0; i < 180; i++)
		{
			text2 = GClass7.smethod_31("ewogICAgImNsaWVudEtleSI6ICJ7YXBpX2tleX0iLAogICAgInRhc2tJZCI6ICJ7dGFza0lkfSIKfQ==");
			text2 = text2.Replace("{api_key}", D52D988B);
			text2 = text2.Replace("{taskId}", newValue);
			text3 = new GClass10("", "", C3B85089, 0).F38A9A06("https://api.capsolver.com/getTaskResult", text2, "application/json");
			if (text3.Contains("processing"))
			{
				Thread.Sleep(10000);
			}
			else if (text3.Contains("solution"))
			{
				break;
			}
		}
		JObject jObject2 = JObject.Parse(text3);
		return jObject2["solution"]!["token"]!.ToString();
	}
	return jObject["errorCode"]!.ToString();
}
catch
{
	return "errorCode";
}
///////////////////////////////////////////
{
    "clientKey": "{api_key}",
    "taskId": "{taskId}"
}
///////////////////////////////////////////////
{
    "clientKey": "{api_key}",
    "task": {
        "type": "FunCaptchaTaskProxyLess",
        "websiteURL": "https://twitter.com/account/access",
        "websitePublicKey": "0152B4EB-D2DC-460A-89A1-629838B529C9",
        "data": ""
    }
}
{
  "clientKey": "CAP-3374FD9E404312F75A5F3A231AE8C318",
  "task": {
    "type": "FunCaptchaTaskProxyLess",
    "websiteURL": "https://twitter.com/account/access",
    "websitePublicKey": "0152B4EB-D2DC-460A-89A1-629838B529C9",
    "data": ""
  }
}
/////////////////////////

gClass.method_17("parent.postMessage(JSON.stringify({eventId: \"challenge-complete\",payload: {sessionToken: \"" + text13 + "\"}}), \"*\")");
if (gClass.C99603B6("[type=\"submit\"]", 10.0) == 1)
{
				gClass.C404DA2C(4, "[type=\"submit\"]");
				C98AB4BD();
				BA3A1221(AF8739B8, "Giải captcha thành công..");
				method_99(text5, AF8739B8, GClass19.D80A6987("Live!"));
				Class21.smethod_7(method_103(AF8739B8, "cId"), "info", "Live");
				flag = true;
}
