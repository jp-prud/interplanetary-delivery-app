# Delivery App 🚀
---
Aplicativo criado para gerenciar delivery interplanetário 


## Sobre o App 📱
- O aplicativo foi aplicado principios de Clean Arch, utilizando React Native.

## Pacotes utilizados
- [```React Native```](https://reactnative.dev/)
- [```Typescript```](https://www.typescriptlang.org/)
- [```React Query```](https://tanstack.com/query/latest/docs/framework/react/overview)
- [```Restyle```](https://github.com/Shopify/restyle)
- [```Jest```](https://github.com/jestjs/jest)
- [```React Testing Library```](hhttps://testing-library.com/docs/react-testing-library)

---

## Telas Vertical
| ![Page1](./.github/resources/Spash.png)  | ![Page2](./.github/resources/Listagem.png) | ![Page3](./.github/resources/Detalhes.png) | ![Page4](./.github/resources/Criacao.png) | ![Page6](./.github/resources/Edit.png) | ![Page6](./.github/resources/Delecao.png)
|:---:|:---:|:---:|:---:|:---:|
| Splash Screen | Lista de Localizações | Detalhes | Criação | Edição | Deleção

## Chamadas API
O aplicativo utiliza o pacote [```JSON Server```](https://www.npmjs.com/package/json-server) para chamadas API REST, por possuir uma implementação fácil, código limpo e legível.

Facilita também a criação de testes unitários.

## Avisos no app
O pacote [```Acr.UserDialogs```](https://github.com/aritchie/userdialogs) é responsável pela exibição de toasts. Diferente da implementação nativa, ele possui um visual moderno e de fácil estilização.

### Possíveis erros ⚠️
Acredito que há alguns erros na tela de criação, busquei manter os schemas adaptados a partir do "Planeta", o que pode ter dado algum erro.
 

## Comentários finais. 💬
- O aplicativo é distribuido na versão Android, e iOS.
- Estive criando alguns pequenos testes só para demonstração.
- Próximo objetivo seria corrigir os pequenos erros e criar a possibiliade de autenticação, para isto, utilizaria a sequinte arquitetura.

[Arquitetura](https://media1-production-mightynetworks.imgix.net/asset/f2a7aad3-a820-4541-a3ee-54b4436d76fa/sign-in-flow.png?ixlib=rails-4.2.0&fm=jpg&q=75&auto=format)

--- 
