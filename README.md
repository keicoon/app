# pytorch-app
pytorch로 학습된 model의 결과를 확인할 수 있는 electron으로 작성된 어플리케이션 입니다.
<!-- # Makeup
front-end application that showing face about before / after makeup.

## "Makeup" 은 무엇입니까?
사람 이미지의 메이크업 전 / 후 를 보여주는 어플리케이션 입니다.
백엔드에는 미리 학습된 makeup model을 가지고 py-torch / tfjs를 통해 결과 이미지를 얻어내고
프론트엔드에서 WebApp 또는 rest-api로 메이크업 전 / 후 이미지를 요청할 수 있습니다.
-->
## 어떻게 사용합니까?
- WebApp
    - Mac
```
cd ./app/electron
npm run auto-build
cd dist/installer
# Mac
hdiutil attach ./MakeupApp.dmg
# Win
./MakeupApp.exe
```
- Rest-Server
```
cd ./app/server
npm run start
```

## 데모
- mnist  
![](https://github.com/keicoon/pytorch-app/blob/master/images/mnist-demo.png)