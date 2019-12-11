const globalConfigs = {
  baseURL: 'https://beta.idle.finance',
  countries:{
    'USA':'United States of America',
    'GBR':'United Kingdom',
    'AUS':'Australia',
    'BRA':'Brazil',
    'CHN':'China',
    'MEX':'Mexico',
    'EU':'Europe',
    'HKG':'Hong Kong',
    'RUS':'Russia',
    'ZAF':'South Africa',
    'KOR':'South Korea'
  },
  payments: {
    methods:{
      'bank':{
        props:{
          imageSrc:'images/debit-card.png',
          caption:'Bank / Debit Card',
          imageProps:{height:'70px'}
        }
      },
      'wallet':{
        props:{
          imageSrc:'images/tokens/ETH.svg',
          caption:'Ethereum Wallet',
          imageProps:{p:[2,3],height:'70px'}
        }
      },
    },
    providers: {
      wyre: {
        enabled:false,
        imageSrc: 'images/payments/wyre.svg',
        imageProps: {
          height: '35px',
          my: '8px'
        },
        caption: 'Buy with',
        captionPos: 'top',
        subcaption: '~ 0.75% fee ~',
        supportedMethods:['bank'],
        supportedCountries:['USA','GBR','AUS','BRA','CHN','MEX'],
        getInitParams: (props,globalConfigs) => {
          return {
            accountId: 'AC_Q2Y4AARC3TP',
            auth: {
              // type:'metamask'
              type: 'secretKey',
              secretKey: props.account
            },
            env: 'prod',
            operation: {
              type: 'debitcard-hosted-dialog',
              /*
                debitcard: Open JS widget with Apple Pay or Debit Card (Error while validating address)
                debitcard-hosted-dialog: Open a Popup (same as debitcard but hosted) (Error while validating address)
                debitcardonramp: INVALID TYPE
                debitcard-whitelabel: ERROR
                onramp: Attach Bank account, KYC, verifications, ...
              */
              dest: `ethereum:${props.account}`,
              destCurrency: props.tokenConfig.wyre.destCurrency,
            }
          };
        }
      },
      ramp: {
        enabled:true,
        imageSrc: 'images/payments/ramp.png',
        imageProps: {
          height: '35px',
          my: '8px'
        },
        caption: 'Buy with',
        captionPos: 'top',
        subcaption:`~ 2.5% fee ~\nGBP ONLY`,
        supportedMethods:['bank'],
        supportedCountries:['GBR','EU'],
        getInitParams: (props,globalConfigs) => {
        	return {
	          hostAppName: 'Idle',
	          hostLogoUrl: `${globalConfigs.baseURL}/images/idle-dai.png`,
	          swapAsset: props.tokenConfig.ramp.swapAsset,
	          userAddress: props.account,
	          variant: props.isMobile ? 'mobile' : 'desktop',
        	};
        }
      },
      moonpay: {
        enabled:false,
        imageSrc: 'images/payments/moonpay.svg',
        imageProps: {
          height: '35px',
          my: '8px'
        },
        caption: 'Buy with',
        captionPos: 'top',
        subcaption: '~ 4.5% fee ~',
        supportedMethods:['bank'],
        supportedCountries:['GBR','AUS','BRA','CHN','MEX','CAN','HKG','RUS','ZAF','KOR']
      },
      'zeroExInstant': {
          enabled:true,
          imageSrc: 'images/payments/zeroexinstant.svg',
          imageProps: {
            height: '35px',
            my: '8px'
          },
          caption: 'Buy with',
          captionPos: 'top',
          subcaption: '~ 0.75% fee ~',
          supportedMethods:['wallet'],
          getInitParams: (props,globalConfigs) => {
            return {
              orderSource: props.tokenConfig.zeroExInstant.orderSource,
              affiliateInfo: props.tokenConfig.zeroExInstant.affiliateInfo,
              defaultSelectedAssetData: props.tokenConfig.zeroExInstant.assetData,
              availableAssetDatas: [props.tokenConfig.zeroExInstant.assetData],
              shouldDisableAnalyticsTracking: true,
              onSuccess: async (txHash) => {
                
              },
              onClose: (e) => {
                if (e){
                  e.preventDefault();
                }
              }
            };
          }
      }
    }
  }
};

export default globalConfigs;