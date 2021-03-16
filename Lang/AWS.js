/*
SAML

1 AWS (Amazon web services) 30+
2 Region :Most services are region scoped -e
   Every region has many cluster of data center(AZ)
   Availability zone :- Each region min 3-6 AZ
   One AZ is down we can launch another
/////////////IAM and EC2 
 
3 IAM(Identity Access management) : User/Groups/Roles/ security, Center of  aws
  User/Groups/Roles
  We write policies in JSON. What user can and can not access
  One IAM Role per Application 
  Never use Root account or don't share
   
 
  

4 EC2 : we create server instance 
    To connect server : putty window < 10
    SSH for Mac/Window 10/Linux
    EC2 connect for all from browser 

5 Security groop :- Allow traffic of EC2 Instance	(Inbound outbound)
   Inbound rule we add rule to access(what we can access)
   its work as firewall 
   Security group can have multiple groups   
   can allow only Allow rules.
   includes IP and other security group

6 Public Private Elastic IP :- 
    We get 1 private IP and 1 public IP on EC2 instance
   Elastic IP (5 on account):-  restart EC2 instance its get new IP, to get Fix we use Elastic IP. you own it untill you delete it
   Avoid Elastic IP use Public Ip assign DNS to it
   When machine restart Public IP changes
   When Elastic IP is not associated with EC2 then u will get charged (Better delete Elastic IP)
   
   
7 To update server := yum update -y   
8 EC2 User Data :-this script run once when instance start. use to boostrap. We automate task
   Installing update,installing software,download common file
   this script runs as root user :- run commands
    
9 Type of instances
    1.On demand instance:-short workload , predictable price (billing per second) (pay letter)
    2.Reserved instance : Minimum 1 year , large workload (pay upfornt 75% disccout)
	  Convertible Reserved instance :- Can change EC2 instance, upto 54% disscount
	  Schedule reserved instance :- Lanch in time when you reserve         
	  
    3.Spot instance :- short workload cheap, can loose instance (90% disscount)
	    Looses Stop instane : when ur max price is less than current spot price
    4. dedicated instance :-No other customer share your hardware
    5. Dedicated hosts :- Book entire physical server  	
	
10 Election network interface(ENI) :- It can get mapped to EC2 instance
11 AMI :- To create custom instance image for server

///////////////////////////////////ELB and ASG/////////////////////////////////////////////

12 Scaling :- Vertical scaling increase size, horizonatl scaling increase the number
13 Load Balancer(Elastic load balancer:ELB-AWS) :-EC2 Load balancer:- Forword internet traffic to servers
   Its keep checking health of server every sepecfied second
   enforce cookies stickness
   we can setup private or public ELB
   Only load balancer can send request then :- We create security group for load balancer with any one access (source :0.0.0.0)
   then Application security group only access to load balancer by (source:security group id of load balancer)  

   3 type of load balancer
   1.classic load balance (Layer 4,7)  :- http,https,tcp
   2.Application load balancer (Layer 7) :- http ,https, websocket, can redirect form http to https
     Routing(redirect) basesd on path in URL,HostName,query string,header (we can redirect based on this value to different EC2 instance)
	  abc.com/user - /abc.com/about , my.abc.com - kk.abc.com, ab.com?id=34  Add rule in listner
   3.Network load balancer(Layer 4) :-TCP,TLS,UDP - Less latancy 100ms
      1 statik IP per AZ,support assigning elastic IP (helpful for white listing sepecific IP)
	  want exptrem perforance or want static IP
14 Load balancer stickness (setting target load balancer) :- same client get redirected to same EC2 instace always  with help of cookie
                               this work with CLB and ALB
15 Cross Zone load balancer (Evenly distributed traffic to EC2 instance) :- Load balancer ditstributes all in register EC2 instance AZ	
                        CLB - disabled default, dont have to pay extra for Enable 
						ALB - Enable default, cant disable 
						NLB - disabled default, pay extra for Enable
16 SSL/TLS :- SSL certificate traffic between client and load balancer get encrytped in transit	
   SSL :- Secure socket layer , TLS :-(Transport layer security ) newer version of SSL
   LB uses SSL/TLS certificate, you can manage certificate using ACM(AWS certificate manager)   
   ALB,NLB support multiple certificates (SNI :-servername indication) then can work with multiple domain (multiple suport group)
17 Auto Scaling Groups(ASG) :-Increase or decrease EC2 instance based on load , CPU usage,Network usage ,custom metric schedule timing usage alarm of cloudfront
   If instance under ASG get terminitted for some resaon then ASG will create new one
   Load balance will mark instance unhealthy then ASG will detroy and create 
   Minimum and Maximum no size of instace set    
   
////////////////////////////////////EC2 storage :- EBS, EFS
18 EBS (Elastic book store) :- when main instance terminited drive data get lossed 
  EBS :- network drive you can attach to your intance when they run . allow to save data like(DB)
  its based on zone, one zone can not access other zone 
19 : EBS vs Instance store :- EBS network drive like PD Instance store is attached to machine its very fast
20 EFS :- Elastic File system :- its work with multiple AZ,expensive

///////////////////////////////////RDS,Aurora and ElastiCache////////////////////////
21 RDS:- Relational database service     
     Create Db in cloud that are manage by AWS(postgres,Mysql,MariaDb,sql,oracle,aurora). It manage Db with Sql like query   
    We can create Replica in Other AZ and others Regaion as well. we have to pay cost
	Multi AZ :- if one DB goes down we can use our DB of backup
	Aurora DB:- AWS databases its fast on RDS. not open source. It create read replica	
	Master and replica used shared storage
	Aurora servelss :-DB it scale automatically based on load
22 ElasitCache :-  managed by Redis or Memcached. Cache memory for high performance. Ram
   We can share state in multiple application
	
VPC-Virtula private cloud
///////////////////////Route S3///////////////////////////
23 Route S3 :- Managed DNS
        A: Host name to IPV4
        AAAA.HostName to IPV6
        CName :- HostName to HostName
        Alias :- HostName to AWS resource		
   Can buy Domain around 12$
24 :TTL (Time to live) :-Browser cache S3 route DNS response for TTL time  
25 : CNAME vs Alias :-
       Cname can point to any domaon. not work with root domain
	   alias should point to AWS domain
	   Alisa free , health check.work with root domain
26 Routing Policy :simple :- Client side load balancing :- return IP from S3 route	
   Weighted routed policy :- Can split traffic between instaces like (instanc1 40% ,instance2 30%, instace3 30%)  
                                 return single IP based on perforance
   Latency Policy :- User get redirected to instace which has less latency(CDN)		
   Health check : Default 3 request to determine is healthy ro not healthy 
                  Route s3 :- health check and return health instance   
   Geo Location Policy :- User from specfic location goes to specific IP
   Multi routing policy :- Return healty muliplie IP browse chooses any     
			
////////////////////////////VPC///////////////////
27 VPC :- Virtual Private Cloud :- Private network to deploy your resoureces (Regional resource) 2 Region == 2 VPC	
    AWS => Region => VPC => Subnet 1, subnet2     
    Subnet:- Allow partition netowrk inside your VPC (AZ resource) -public subnet,Private subnet	
	Internet gateway & NAT Gateways 
	Internet Gateway :-Help VPC instance to connect to internet
	                   Public subnet have route to Internet Gateway
    Nat Gateway :- Allow private subnet to access Internet while remaining private
                 Deploy Nat gateway to public subnet : add route to public route	
	
28 Network ACL :- Firewall allow traffic from and to subnet
                  Attached to subnet. Rules only includes IP
29 VPC flow log :- Capture information about IP traffic	going into your interface 
               VPC flow logs
                Subnet flow logs
                Elastic network interface log 
     Monitor and troublshoot connectivty issue eg .Subnet to internet, subnet to subnet, internet to subnet 
     VPC flow logs data can go to S3/Cloudwatch logs	
30 VPC peering :- Connect to 2 Vpc, Privately using AWS network 
                  Make them behave as they are in same network
               Must not have overlapping CIDR(Ip range address)
31 Endpoint :- Allow to connect to AWS services using private network instead of public www ----network	inside VPC
                VPC Endpoint gateway :- S3  & DynamoDb
 
 //////////////////////////////////S3///////////////////////////////////
 
32 S3 :- 4 types of method to encrypt file
          1.SSE-S3 : Key handled and managed by AWS		  
		            must se header :- x-amz-server-side-encyription:'AES256'		  
		  2.SSE-KMS :-Leverage AWS key management service to manage to encryption key (User master key defined on s3)
		           must se header :- x-amz-server-side-encyription:'aws:kms'	
          3. SSE-C :-when you want to manage your own encryption key. must used:https 
		     Data key in header
          4. Client side encryption 
33 S3 Security 
          User based :IAM
		  Resourece based :-Bucket policies
		                   Object Access control list (ACL)
                           Bucket Acess control list (ACL)	
						   
/////////////////////////  AWS CLI, SDK, IAM Roles & Polices//////////////////////////


34 AWS CLI on local :cmd :- aws configure > enter Access keyId, Access key,Region,Default output format :none (On your local)
35 AWS CLI on EC2 :- Use IAM roles to access  
             run  aws configure ,dont put AWS access key and ID 
                curl instance/meta-data get meta data	
 
   AWS configure --profile myOhterawsaccount (to use multiple AWS account in CLI)
     AWS s3 ls --profile myotherawsaccount (use others account)
				
  IAM roles has policies
  IAM policy generator,IAM Policies Simulator
  DRy run :--dry run check if we have access to perform that action
  STS - sts decode-authorization-message 
                  sts decode-authorization-message --encoded-message "msg"

  SDK :- Software development kit to call from code		

36 : Exponentail backoff : if server has limit number request per second  (Throttling expeption)
                           1 req wait 1 second
                            2nd req wait 2 second so on...	
37 : SigV4	: you are singed in with your credentail to access AWS	(like video)
                Added in header or in Querystring					
							
							
///////////////////////////////////S3 and Anthena////////////////////////////////
38 S3 MFA Delete(We need to use root account) :- Before doing importan Operation on S3 bucket we generate code on device	
                        Can do it with cli only						
39 S3 Access log:- Log all request of s3 bucket
40 S3 Replication (Cross region and same region) :- copy bucket from one to other . can not delete
41 S3 storage class :- 
             1. S3 Standard general purpose :-High durability (99.99999%)
             2. S3 standard :Infrequent Access(IA) : low cost 
             3. S3 one Zone :Infrequest Access : 99.5 availabitly less cost than IA (single zone can loss)	
             4. S3 intelligent Tiering :-Small Montly monitoring and tiering fees 
                                        Move the object access tier based on its use
             5. Amazon Glaciar :- Archive save data (month:- very low 0.004$/GB + retrival cost) (minimum 90 days)
                  Retrival Options 
                   Expedited :- (1 to 5 minutes)
                   Standard (3 to 5 hours)
                   Bulk (5-12 hours) 		
             6. Amazon Glaciar Deep Archive : super long term  (minimum 180 days)
				    Retrival Options 
					Standard - 12 hours
					Bulk - 48 hours
42 S3 event Notification : On S3.objectCreated. On S3.objectRemovd
                    Call SNS,SQS,Lambdafunction   
                      SQS :- Simple queue service
43 : Anthena : perform Analytics for S3 bucket files without loading data in DB
              Paid based on query		

/////////////////////////CloudFront/////////////////////////////////////
44 : CloudFront:- CDN Content delivery network
         AWS has multiple edges location file get cached at edge from main source
		 
   CloudFront - Origin 
               S3 bucket
               Application load balancer
               EC2 instance
               S3 website
               any http backend

   OAI - Origin Access Identity
        Only cloudfront can access bucket with OAI 

      Geo Restriction
        Blacklist
        Whitelist

        /////////////////////ECS,ECR & Fargate Docker in AWS///////////////////////
45 Docker :- Development platform to deploy app   
             App are packaged in container run by any os 
             Run any application in any machine

      Docker image stored in Docker hub (public repo)
      ECR -  private repo :-Amazon ECR (Elastic container registry)
      Dockerfile build to docker image its saved to docker repo. pull and run it gives docker container

      Docker container management 
      kubernates(Open source)
      ECS :- Amazon own platform
      Fargate :amazon own serverless platform

 46. ECS Cluster (Elastic container service) :-  logical grouping of EC2 instances 
                  EC2 instances run ECS agent(Docker container)
                   ECS agent register instances to ECS cluster
                   EC2 instances run special AMI made for specially for ECS

            We create ECS cluster: ASG get created :- EC2 get created 

 47  ECS Task definition :its metadata JSON to tell ECS how to run a Docker container
                         Image name,Port binding in container and host,Memory and CPU required
                         Environment variable and Networking information             
48   ECS Services :-How many task run and How should they run
49 Fargate :-Its all serverless. No more EC2 instances for docker directly use container



///////////////////////////BeanStalk///////////////////
50 BeanStalk:- Application to deploy application on aws ,free
51 . BeanStalk deployment option for update
          1. all at once - stop all instance deploy and start
          2. rolling :-update few instance at time
          3.Rolling with additional batches :- spin new instance to move the batch(old application available)
          4. Immutable :-Spins up new stance in new ASG, deploy version to these instances. swap all instance when everything is healthy   

          //////////////////////////CICD/////////////
52  CICD:- Code push code get deployed / continuous integration : jenkins ,teamcity,codebuild AWS
   Code deploy AWS
  
   Codecommit AWS = git

 53 ///////////////////////////CloudFormation//////////////////////////  



			  
					  
				   
				   
				  
            			  
						   
		  
 

 		   
				  
 
 
			 
			 
								 
	   
	
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
							   
                                     							   
	  
	  
     
  
   
*/


/////////////////////Cloud front///////////////////////////

   







 
  


*/