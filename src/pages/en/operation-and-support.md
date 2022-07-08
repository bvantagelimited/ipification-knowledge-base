---
index: 7
category: info
path: /en/operation-and-support
title: Operation and Support
---


##  Is there any Operation & Maintenance tool for our operation team to use? Also is there any log/report available as well?

GMiDBox supports standard SNMP protocol so you can attach any O&M tool and receive alerts and doing monitoring. 
GMiDBox also has very well organized logging modules.

##  Does GMiD Box have ability to set up different role/authorization for each user? (such as user for MKT and Engineer should have different rights.) 


For GMiDBox Console (web admin app) users, right now there is no different roles for this app but future release will add that functionality.

##  Can we carry vulnerability scan on GMiD Box?

You can do any VA scan you want. It is a recommended step. Many Telcos do VA scan by themselves. We also use some 3rd party company to carry VA scan for our internal purposes. We are trying to keep GMiDBox security on a maximum level and we invest a lot in this field. Any your VA report will be very welcome by us.
 
##  How can we see number of API call into GMiD box? (Total amount, number of Success transaction and number of Fail transaction)

There is GMiDBox Console, web application for management and reporting. You can see statistics data and export reports. Right now, there is only statistics of successful transactions, but future release will add also total requests, conversion rate, etc.

##  Is there any log/report available in GMiD Box that allow us to see the transaction?

There are very detailed log system on GMiDBox. The log for API transactions is located at /home/idbox/var/log/api-service/api_service.log

##  Does reconcile process between operator and IPification require?

GMiDBox generates all reports on your side, and IPification Cloud has its own reports. These two reports can be compared at any time.

##  What is the usage of Destination IP?

We make use of Destination IP to filter NAT logs. If you can filter logs on CGN and send to GMiDBox only logs for our destination - api.ipification.com(52.74.155.228) - then we don’t need Destination IP in log. Because GMiDBox processes only logs for our destination and all other simple reject. 

##  How you make use of MSISDN ? 

I can see MSISDN in your example. Is MSISDN present in NAT log? In case it is, we can use MSISDN as correlator instead of PrivateIP. In that case we will avoid logic of Zone parsing which will save processing time.
[Parinya] Yes, there is MSISDN in NAT log. With MSISDN existing in NAT log, does it affect to your proposed solution? Does AAA Radius log still require?
[Alex] Great! Then we will use MSISDN as correlator instead of PrivateIP and we do not need to parse Zone. But, yes we still need AAA because we are using also IMSI and IMEI. Everything will be the same just MSISDN will replace PrivateIP. Like this:
PublicIP:Port --> MSISDN
MSISDN --> MSISDN:IMSI:IMEI

##  What API GMiDBox support ? 

There are two types of API supported by GMiDBox. 
GMiDBox API - custom REST API, you can find detailed explanations in attachment GMiDBox_API.pdf, please refer to page 6 related to Responses. You will see that there are actually 2 types of responses. One is just with MobileID and another contains MobileID and MSISDN. Usually IPification is using the first one, just with MobileID (without MSISDN) because our policy is to keep user privacy and not to share private data. The second one (with MSISDN) is usually just for MNO purposes. You dont need to ask user to enter phone number, you can just take it from GMiDBox and login user automatically and collect all usage and history based on the MSISDN. When both values are present response looks like this:
```json

{
"msisdn" : "381692023534",
"mobile_id" : "2d90c1a5bff1e5274bae6ee2c1adbe5239bfe9cc79ecd67bf874a90784d790b4b8307f21168136913f729b9d66fd311d8df10f9f03c69ff1ff94d0a47b40b2ff"
}
```

When MSISDN is omitted then only MobileID is present.


2. IPification Cloud API - is actually OpenID Connect API (OIDC) and it looks like this:
```json
{
"sub": "007eda5e-d203-4a9e-ad71-38bec05a69f7",
"preferred_username": "2d90c1a5bff1e5274bae6ee2c1adbe5239bfe9cc79ecd67bf874a90784d790b4b8307f21168136913f729b9d66fd311d8df10f9f03c69ff1ff94d0a47b40b2ff"
}
```
##  Does Geo-redundancy of GMiDBox require?

It is not necessary but it can be a benefit. If we want to provide good SLA to the service providers, geo-redundancy is a good to have. But it is pretty similar as any other equipment you have in different data centers. You can deploy GMiDBox in every DC you have equipment like GGSN/PGW and CGN. It is not necessary to have centralized GMiDBox. They can be decentralized but need to have connectivity between instances in order for data replication. 