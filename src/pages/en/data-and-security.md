---
index: 8
category: info
path: /en/data-and-security
title: Data and security 
---

##  What data will be kept on the storage?

On disk mostly Authentication logs are kept for troubleshooting and investigation purposes. Other logs, including RADIUS and Syslog, GMiDBox cannot keep too long, usually few hours to maximum few days, which depends on amount of logs. If you need to keep RADIUS and Syslog logs more you can assign more storage to GMiDBox or GMiDBox can move logs to some Remote Storage for backup.



##  How long GMiDBox keeps data?

There is data timeout as global settings and it is by default set to 1 day for RADIUS data and 1 hour for NAT data. But it can be set based on your configuration related to max duration for PDP and NAT session. In general, keeping data until session is active is the mandatory for authentication process, otherwise authentications will fail in case if we delete data but session is still active.
         
##  How long does information (from GGSN/PGW and CGN) be kept in GMID box? 

Acct Stop message removes RADIUS data. NAT close session message (if exists) removes NAT data. In worst case NAT data is kept for 1 hour, there is automatic expiration of data.

##  Can GMiDBox encrypts all stored data?

In case we do not want the information to be kept in plain text, can encryption be applied? In case service performance is affected, can we increase the H/W specification to overcome this issue?
Enabling encryption on GMiDBox will require big development on our side. Redis Database does not support encyption out of the box, so the only way how encryption can be enabled is to do it on application level, which means that we need to implement same encryption algorithm in several applications and services which are part of GMiDBox System, including FreeRADIUS, Syslog-NG, API...
Here are some facts from official Redis documentation related to encryption:
"Redis is designed to be accessed by trusted clients inside trusted environments. This means that usually it is not a good idea to expose the Redis instance directly to the internet or, in general, to an environment where untrusted clients can directly access the Redis TCP port or UNIX socket."
- https://redis.io/topics/encryption
- https://redis.io/topics/security

But there is a possibility that you send to GMiDBox already encrypted data. We have some cases of GMiDBox integration like that. For example Telkomsel Indonesia sends to GMiDBox NAT logs from F5 CGN (so only NAT log, without AAA RADIUS messages, but containing all necessary data, MSISDN, IMSI, IMEI which are encrypted), like this:

```shell
15/03/2019|02:05:12|8986ff5772ac474ef6e0d18357cba1ef1245efd9|d5a41b4349938e2b60a3480d3f9179cd9bb6373c|c9ab940c8a437945130ee9b17b857aa107443de4|114.125.116.56:43672|52.114.32.8:4433

[DATE (format: %d/%m/%Y)]|[TIME (format: %H:%M:%S)]|Hashed_MSISDN|Hashed_IMSI|Hashed_IMEISV|CGNAT_IPPORT|INTERNET_IPPORT
```

If you can provide to GMiDBox something similar it will be great and will solve all your doubts.

##  Any impact to storage of GMiD Box if subscriber’s data session period is long?   

For sure memory usage will be higher if there is bigger number of active sessions. It is not storage but memory limitation. All logs are stored in memory and are not persisted on disk. This is also good from security point of view. Nobody can access data on memory directly without memory dump, which is not easy job.

##  During PoC, can we see information/data that keep in GMiD Box? Can we see DB schema that keep in GMiD Box?

You can access to Redis Database at any time by using redis-cli tool and look at data. It is not an easy job because data are distributed through Redis Cluster. When you have 16 instances on 2 servers it is not easy to find data manually, but it is possible.

##  Does any incoming authentication request will go through every GMiDBox?    

No. Data are shared between nodes. GMiDBox uses Redis Cluster so there is data replication between nodes and where ever request comes that node will be able to provide data.

 ##  How do you intend to solve the tethering problem (detection of WLAN usage via operating system?)

Tethering as a shared data connection presents potential issue that someone behind tethering device can be identified and authorized as that device. IPification supports several mechanisms to identify and exclude tethering device/requests:
1. On Network/GMiDBox side - if Network has separate APN and/or Private IP Range for tethering connections then we just exclude such data from GMiDBox and all is fine 
If Network supports any kind of tethering detection GMiDBox can rely on the same mechanism and exclude such data

2. On IPification Cloud side, there is a mechanism to identify device connection, is it Cellular or WiFi, by using browsers Web Workers and Network Information API, and reject all WiFi connections

3. On App Developers / Service Providers side, they use IPification Solution only in case when device use Cellular connection, on WiFi they even do not try to use IPification  
 
 
##  Do you collect consent of the user to be recognized in the mobile network?

IPification has been developed with the main aim for keeping user's privacy fully protected (which unfortunately is not the case with most of the current authentication technologies being used today). As you have seen our MobileID is representing only the HASH value (one-way hash which cannot be decrypted backwards) of network-based parameters. 

When user is using IPification for the first time, there is also a consent page (which is optional depending on the country/MNO regulations) managed on IPification side and shown to the user to confirm if they want to be authenticated this way (consent page attached).  
 
##  How would you handle the case of cloning SIM card? 
 
Two identical SIMs (original and cloned SIM) cannot co-exist at the same time on the same network, because it would break the standard and basic security feature of any network operator today. If someone tries to clone the SIM card of a person, at the point he/she tries to activate it in the network there will be security mechanism activated on the network side to stop either the new SIM from joining the network or stopping the service for both SIM cards until the resolution is made. Networks are verifying IMSI in their database level, not on at the BTS levels. 
 
Regarding our service, if someone in theory manages to clone someone else's SIM card (and obtain the same IMSI) and make it active in the network (while the other person is not aware of it), he/she would also need to have that person's Device (to unlock it :)) as well and to know that person's phone number, to clone it also on the SIM card. Last but not the least to use also exactly the same service this person is using in order to get same Mobile ID generated on our side. 
 
##  How will you handle the case of Mobile number reuse? 

99% of App developers do not think about this huge security loophole, that's started to happen in many countries as we can see. Hackers are buying prepaid SIM cards, registering their phone numbers in 100s of Apps and then after 1 month they return SIM cards to the operator (together with Phone numbers) and saying that they don't want to use them anymore. These phone numbers in 3-6 months (some countries even earlier) are given to some new customers who are then targets for hacker’s identity/fintech attacks, since they already have the access to all those apps they installed before (most of the apps do not require any additional verification for them). 
 
Our solution is helping a lot here, since our MobileID contains 3 very important parts - aside from Phone number (MSISDN), it contains also IMSI and IMEI as well, which means that if something changes here, like SIM card or Device (no matter phone number stays the same), MobileID will be different and App Developer will act upon this information. 
 
##  How about swapping the SIM card issues? 

We refer the potential security issue here as SIM Swapping/Hijacking. 
As mentioned above, new SIM card will have new IMSI number, which will lead to different Mobile ID we are going to generate, so App Developers will be aware of this change and can act upon it. 
 
##  Do you support Virtual SIM card 

There are two type of virtual Sim card
 
In the case of eSIM, it is basically everything the same as with physical SIM. eSIM has all the features and values as a standard physical SIM (including IMSI, ICCID etc.) - so our solution works in the same way. 
 
In the case of virtual phone numbers, this is cloud-based solution usually provided through some App that needs to be installed on the phone. This service mainly works on a VOIP basis so user can use this app (with virtual phone numbers) attached to it to make phone calls like via Whatsapp etc. Usually a lot of different phone numbers can be assigned to this App to be used. Since this kind of solutions do not use or rely on Cellular data, our solution will not be applicable in this case. 
 
Here is also a big advantage of IPification since the SMS OTP service can be used with these virtual phone numbers obtained online and do the "fake" online user/device verification, while in the case of IPification user must actually use the real number they have currently in use (active in SIM card/device). 
 



