App = {
  web3Provider: null,
  contracts: {},
	
  init: function() {
   $.getJSON('../real-estate.json', function(data){   //jSON 파일 내용 추출
     var list = $('#list');   // ID가 리스트인 부분을 변수에 저장
     var template = $('#template');

     for(i = 0; i < data.length; i++){
       template.find('img').attr('src',data[i].picture); //template img 태그를 찾고 src속성의 json 배열 인덱스에 있는 picture 필드의 값을 가지게함.
       template.find('.id').text(data[i].id);  //id 태그를찾고 id필드의 값을 수정(값은 json에서 가져옴)
       template.find('.type').text(data[i].type);
       template.find('.area').text(data[i].area);
       template.find('.price').text(data[i].price);

       list.append(template.html());
     }    //for loop가 끝나면 id가 list인 div에 10개의 완성된 template이 보인다.
   })
   return App.initWeb3();
  },

  initWeb3: function() {  //web3 instance가 이미 활성화 되있는지 체크
    if(typeof web3 !== 'undefined'){  //metamask가 설치되어있다면 undefined가 아니다. 즉 metamask가 설치되어있을 때
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    }else {   //metamask가 없을때
      App.web3Provider = new web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },


  initContract: function() {  //스마트컨트랙트를 instance화 하는 단계
		$.getJSON('RealEstate.json', function(data){  // artifact 파일안에 있는 데이터를 TruffleContract 라이브러리에서 제공하는 trufflecontract에 넘겨서 instance화 시킨다.
      App.contracts.RealEstate = TruffleContract(data);
      App.contracts.RealEstate.setProvider(App.web3Provider);  // contract 공급자 설정
    })
  },

  buyRealEstate: function() {	
    var id = $('#id').val();
    var name = $('#name').val();
    var price = $('#price').val();
    var age = $('#age').val();

    web3.eth.getAccounts(function(error, accounts){
      if(error){
        console.log(error);
      }

      var account = accounts[0];
      App.contracts.RealEstate.deployed().then(function(instance){
        var nameUtf8Encoded = utf8.encode(name);
        return instance.buyRealEstate(id,web3.toHex(nameUtf8Encoded),age, {from : account, value : price});
    }).then(function(){
      $('#name').val('');
      $('#age').val('');
      $('#buyMoal').modal('hide');
    }).catch(function(err){
      console.log(err.message);
    });
    });
  },

  loadRealEstates: function() {
	
  },
	
  listenToEvents: function() {
	
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
  $('#buyModal').on('show.bs.modal', function(e){
    var id = $(e.relatedTarget).parent().find('.id').text();
    var price = web3.toWei(parseFloat($(e.relatedTarget).parent().find('.price').text() || 0), "ether");
    $(e.currentTarget).find('#id').val(id);
    $(e.currentTarget).find('#price').val(price);
  });
});
