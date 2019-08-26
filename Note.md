# BlokChain Theory
<hr>
OS : Windwos 10<br>
Node : 10.15.3<br>
Npm : 6.9.0<br>

install
- Git
- Geth 1.8.27 , add Path 
- Truffle 4.1.15
- solc@0.4.24
- ganache-GUI
- VSCode + solidity Extension
- Metamask


Note
<hr>
Geth : GO 언어로 만들어졌으며, 풀이더리움 노드를 로컬에서 커맨드 라인을 통해 실행시키는 프로그램. 쉽게말해 이더리움 클라이언트

puppeth : Geth에서 제공되는것으로, 새로운 이더리움 네트워크생성할떄 사용
- 제네시스 블록을 생성하고 json파일로 추출하여 보았을때,
1. ethash : 작업증명방식 알고리즘 사용시 표시됨
2. timestamp : 이더리움 가상네트워크에서 난이도 조절에 쓰이며, 두 블록간 차이가 적으면 난이도가 높고 차이가 크면 난이도가 낮다.
3. gasLimit : 블록 내 트랜잭션이 최대로 소비할수있는 가스 제한량
4. difficulty : 블록의 유효성을 검사할떄 쓰이는 난이도, 채굴자가 블록을 채굴하기위해 퍼즐을 풀면서 연산을 몇번이나 해야하는지 이 값과 직접적인 연관이있다, 값이 높으면 연산이 오래걸린다.
5. alloc : 지갑주소의 자금을 미리 할당
6. number : 블록의 넘버, 제네시스이기때문에 0
7. gasUsed : 이 블록내에서 여러가지 트랜잭션을 처리하면서 사용된 가스의 합계
8. parentHash : 부모 블록의 해쉬를 담고 있다, 제네시스블록은 첫 시작이므로 부모해쉬가 없다.

geth --datadir . init mynetwork.json
- geth 커맨드를 사용하여 datadir(현재 디렉토리라는 명령어) . 안에다가 private 노드 데이터를 저장하는 뜻, init private 데이터를 초기화하기위한 제네시스 블록(mynetwork)의 파일이름을 명시하는데 쓴다.

geth --datadir . account new
- keystore 폴더안에 새로운 이더리움 계정을 무작위로 생성, 비밀번호 필요하다(계정의 private 키를 보호하기 위해서)

geth --datadir . account list
- 생성한 순서대로 번호를 매겨서 계정들을 보여줌, 계정리스트 와 파일의 위치를 알려준다.
- 첫번째 계정은 모든 채굴보상금이 첫번쨰 계정으로 들어간다.

geth --networkid 18336 --mine --minerthreads 2 --datadir "./" --nodiscover --rpc --rpcport "7545" --rpccorsdomain "*" --nat "any" --rpcapi eth,web3,personal,net --unlock 0 --password ./password.sec  
- mine 노드에서 채굴을 시작하게하는 파라미터
- --minerthreads 몇개의 채굴을 할것인지
- --nodiscover 다른체인이 우리노드에 접근하는것을 못하게 한다.
- rpc rpc end point로 메타마스크를 통해 geth에 실행된 노드에 연결할수있다.
- rpcport 어떤 포트에 명시하는 파라미터
- --rpccorsdomain "*" 아무 도메인에서나 우리 rpc end point에 접속할 수 있도록
- rpc end point 에서 어떠한 api를 커맨드로 사용하기 위한 파라미터
- --unlock 0 첫번째 계정에 보상금을 받기위해 unlock 함
- --password ./password.sec 파일에 password 명시

C:\Users\Administrator\AppData\Ethash
- 노드 채굴 블록들이 저장된다.

노드를 실행하였을때 나오는 DAG
- Directed Acyclic Graph, 일방향성 비순환 그래프
- ethash 채굴 알고리즘에서 필요한 데이터 구조
- 채굴을 하기위해서는 DAG 파일이 먼저 필요로 한다.
- 매번 3만개의 블록이 생성될때마다 DAG파일이 새로 생성된다.
- 3만 블록을 명칭하는것을 epoch(에폭) 이라고 한다.
DAG 관련
https://steemit.com/dag/@cryptodreamers/dag-dag-directed-acyclic-graph
https://kor.coinmarket.media/guide/about_dag/
Epoch 관련 및 용어 관련
https://steemit.com/kr/@justfinance/by-jon-choi

geth attach ipc:\\.\pipe\geth.ipc
- 백그라운드에 돌고있는 노드에 연결시킴

instance: Geth/v1.8.27-stable-4bcc0a37/windows-amd64/go1.11.5
coinbase: 0xf83625d538ff2dd3943e0545afd23aebff3c3f39    //첫번째 만들었던 계정의 주소
at block: 332 (Tue, 06 Aug 2019 00:52:08 KST)
 datadir: E:\workspace\BlockChain\Ethereum\Property_dapp
 modules: admin:1.0 debug:1.0 eth:1.0 ethash:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0 // 이 창에서 쓸수있는 api들

 eth.coinbase
 - coinbase , 맨처음계정의 주소가 나온다.

 eth.accounts
 - node에 등록된 계정들이 나온다.

eth.getBalance(계정) ex) eth.getBalance(accounts[1])
- 계정의 잔액 확인, wei로 변환되어 나온다.

web3 api 사용하여 명령어

web3.fromWei(eth.getBalance(eth.coinbase), "ether")
- 첫번째 계정의 잔액을 ether 단위로 보겠다.

miner.stop()
- 현재 채굴 멈추기

miner.start(2)
- 채굴 시작 , 숫자 2는 몇개의 스레드에서 채굴을 시작하게할지 정하는 파라미터

personal.unlockAccount(eth.accounts[1],"940715", 200)
- 계정 unlock
- 그 계정의 private키를 열어서 트랜잭션에 서명할 수 있게 하는것.
- 계정, 비밀번호, 200초간 unlock 하는 파라미터 정보들이다.

계정에서 다른 계정으로 송금하기
eth.sendTransaction({from:eth.coinbase, to:eth.accounts[1],value:web3.toWei(20,"ether")})
- 채굴창에서 기록이 남는다.
INFO [08-06|01:12:16.008] Submitted transaction                    fullhash=0x0355c318eee00a1381d4a1663d21025221c139ff22847b4569fbf7b22b447292 // 해쉬 정보 recipient=0xC1B622Dd6Fb53B38E2B2e02b2A0f24B74538Bf7B    //수령인의 주소

위의 트랜잭션이 다음블록을 생성할때 추가가 된다.

eth.getBalance(accounts[0])
eth.getBalance(accounts[1])
잔액 확인하면 전송된 금액들이 보인다.

// truffle 폴더에서 truffle init를 사용하여 설정 후

truffle-config.js
- 트러플의 환경설정을 담당하는 js파일

contracts 폴더
- solidity contract 를 보관하는 폴더
- 어느 network에 배포할지 나중에 정의할수있다.

migrations 폴더
- contract를 노드에 배포하는 역할을 하며, 배포할떄 스크립트 파일들을 실행하게 한다.
- initial_migration.js 는 배포할떄 사용하는 로직이 담겨있다.
- 파일명이 1_ 이렇게 시작되듯이 배포할떄 순차적으로 숫자대로 실행이 된다.

test 폴더
- contract를 테스트하는데에 쓰인다.


truffle compile 명령어 : 컴파일
truffle migrate 명령어 : 배포

배포했을때 콘솔에 나오는 정보
Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0xb0356231711f317a1d772c49bdfc03149f07ee97e281670a41d4697cf2a2b021        <<배포하면서 생성된 트랜잭션의 해쉬
  Migrations: 0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f                        <<배포된 컨트랙트 주소
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Replacing MyContract...
  ... 0x404935ec1ee7cbb4aa03e5cf1865eb438d16e20e93341b885a534463fe9164d0
  MyContract: 0x9fbda871d559710256a2502a2517b794b482db40
Saving artifacts...

이렇게 배포하였을때 또 migrate를 하게되면 이미 배포가 되어있는건 또 다시 배포가 안되게 되있다.
Migrations.sol 의 last_completed_migration 가 숫자가 카운트되어 저장되기때문에 기존 컨트랙트를 수정하여서 다시 배포가필요할때는 초기화를 해줘야한다.

> migrate --compile-all --reset         //초기화, migrate 하게되면 다른 주소로 배포하게된다.
혹은
> truffle migrate --reset
혹은
> truffle migrate --compile-all --reset --network ganache // 가나슈와 연동시

> truffle migrate --network ganache // 가나슈와 연동해서 배포

> truffle console --network ganache // 가나슈와 연동된 트러플 콘솔로 이동

> truffle test --network ganache  //테스트할떄 사용

>
truffle develop 명령어 : 개발 명령어
truffle develop --log : 노드의 로그를 볼 수 있음


compile 혹은 migrate를 하게되면 build 라는 폴더가 생기고 생성된 json 파일들을 artifact 라고한다.
생성된 파일은 해당 컨트랙트의 abi(application binary interface) 정보와 컨트랙트와 관련된 모든 정보를 JSON 형태로 가지고 있다.
arttifact 파일은 abi정보와 컨트랙이 배포된 주소를 가지고 있다.


ganache와 연결할려고한다면 truffle-config.js network{} 에 
ganache:{
        host : "127.0.0.1",
        port : 7545,
        network_id : "*",
      }

      를 추가해주어야한다.
---------------------------------------------
프로젝트폴더 estate를 만들고 truffle starter 팩(강의에서 제공되는) 설치 후
real-esate.json : 매물의 리스트를 보여주는 파일
bs-config.json : lite-server를 통해 돌릴것이며 서버에 필요한 파일
가나슈와 연동하고 migrate 후 truffle console로 진입하여
RealEstate.deployed().then(function(instance) {app=instance;})  // RealEstate의 컨트랙트의 인스턴스를 전역변수에 저장
app.owner.call()  // 소유자 주소확인

컨트랙트 테스트를할떄 test 폴더에 스크립트 파일을 만들어서 배포한다.
스크립트 작성후 테스트 명령시
> truffle test --network ganache    //가나슈가 실행되있고 컨트랙트가 배포되있어야한다.

매물구입함수 만들고 배포 후 송금까지 확인.
이벤트 등록(매물을 매입하면 매입완료가 되었다는걸 알리기위해)
app.LogBuyRealEstate({},{fromBlock : 0, toBlock: 'latest'}).watch(function(error,event){console.log(event);}) //이벤트 등록

app.buyRealEstate(0,"sejong", 14, {from : web3.eth.accounts[1], value : web3.toWei(1.50, "ether")})