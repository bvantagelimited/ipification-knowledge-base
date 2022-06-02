---
index: 6
category: info
path: /implementation-requirements
title: Implementation Requirements
---



##  Does VPN require for implementation?

We can establish VPN from IPification Cloud hosted on AWS.
Instead of VPN it is possible to have standard ACL rule on your firewall which will allow access from our IP address to GMiDbox inside your network.

In both cases it is mandatory to have access to port HTTPS/443 for API access, and if we are going to manage GMiDbox we also need SSH/22 port.

##  What is the minimum version of CentOS that can be supported?

CentOS 7 is certified and tested for GMiDbox. So, the latest version 7.6 is the best choice.

##  Does IPification require load balancing node to handle this?

No. GMiDBox has Load Balancing and Failover implemented inside itself. You just need to provide several VIP addresses. 
Our recommendation is to go with 4 NIC per server. 1 NIC per each protocol - RADIUS, SYSLOG, API/HTTP - plus 1 NIC for Redis Cluster Replication. For such configuration, it requires 3 VIP addresses, each for specific protocol - RADIUS, SYSLOG, API/HTTP. 
So, based on VIP, GMiDbox can achieve High Availability. For details please refer to our GMiDbox_High_Availability.pdf document.

##  What information that IPification require for implementation? 

There are two things IPification needs 

1. A registered domain, i.e. ipification.teleco.co. You need to allow IPification Cloud to access it on https/443 which has to point to GMiDbox server on 443 port. Https requires verified SSL Cert to be installed in GMiDbox server.
2. All Public Internet IP addresses which are owned you. On that way IPification recognize that user request comes from you, and then send user resolution request to your GMiDbox.

##  Do you support onsite implementation? 

We can do any onsite support if needed with standard covering for our stuff in terms of accommodation and flights. We can support you also remotely if you give us SSH access to GMiDbox server. It is an usual way we do with MNOs all around the world. The most important tasks are on your engineers who need to setup GGSN and CGN to send logs to GMiDbox.








##  What is the capacity of GMiDbox ? 

From our experience, a single server can provide the following capacity. 

| (requests/second) | 1xCPU/4GB RAM | 4xCPU/16GB RAM | 8xCPU/16GB RAM |
|-------------------|---------------|----------------|----------------|
| FW Syslog         | 15439         | 63535          | 127070         |
| AAA RADIUS        | 1799          | 3539           | 7078           |
| Authentication    | 436           | 1602           | 3204           |



With 2 machines solution, it can process almost double of these numbers. And scaling is always an option. Adding additional node in cluster is a simple process and can be done at any time if is needed.
##  What is the network requirements? 

We recommend 4 NIC per server (1 NIC per each protocol). If there is any constraint for number of NIC per server, 2 NIC per server is also acceptable. 
We suggested 4 NIC because we would like to separate traffic per protocol, i.e.1 for RADIUS, 1 for Syslog, 1 for Redis DB and 1 for API/SSH. You can even go with 1 NIC but it is better if you can assign at least 2 NIC. Depends on traffic, you will decide how to separate them. Usually the biggest traffic is for Syslog, so you can send NAT Syslog to 1 NIC, and everything else can go through another one. If you want to go with 3 Layer topology it will be even easier and 2 NIC per instance will be more than enough.

##  How many IP address of IPification Auth node has (IdP)?  

IPification Cloud will connect to GMiDbox inside your network with one IP address. It is IPification Cloud Gateway and its IP is: **18.136.139.238**

##  Is your solution compatible with IPv6? 

GMiDbox and IPification support IPv6 and direct user resolution without NAT.

##  GGSN/PGW/AAA supports sending Acct message in 3 modes (synchronous, asynchronous, periodic mode). Which mode that IPification prefer? 

Asynchronous mode is the most suitable for GMiDbox. But there should be retry mechanism, because delivery of Acct messages must be guaranteed.

##  Is it possible to use 4 sets of [4xCPU] servers instead of 2 sets of [8xCPU] servers? 

It is possible. You can go with 4 VMs with half resources per one instance, let’s say 4xCPU, 8GB RAM, 150GB Storage. Such configuration should give same performances. It is also possible to have 3 Layer topology if you prefer something like that. It means that you can have 2 nodes for DB, 2 nodes for RADIUS and Syslog, and 2 nodes for Auth API. And then you can scale only necessary layer.

##  Does GMiD box able to install on bare metal instead? 

It is possible to install GMiDbox also on bare metal. 

##  If incoming traffic is higher than memory availability, what will happen? How GMiD box handle the overflow traffic? Is there any impact to customer?

It is not point of incoming traffic, but the number of logs GMiDbox keeps in memory. And it keeps only active PDP and NAT sessions, and also NAT sessions are filtered only for IPification servers. The size of data which GMiDbox store into memory database is pretty small, around 100bytes, so in 4GB of RAM there can be around 40 million of active sessions.

##  Is there any other DB option besides of Redis DB? 

No. GMiDbox works only with Redis DB. There is no another database which can give such performance for free. Redis DB is the fastest In-Memory database which support clustering and data sharding with replications and fail over mechanisms. 
And it is not hard for operations and maintenance. It is simple Key-Value database, not relation database, and its performance is incredible. In our labs we did test with 6millions transactions per second. 
It is really amazing and by using GMiDbox it will be good starting point for you to see the real power of Redis DB and probably to use it on some other projects.



