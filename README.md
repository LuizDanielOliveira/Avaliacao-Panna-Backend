## BACKEND (NestJS + SQL Server)

### 📦 Instruções de Instalação

```bash
npm install --legacy-peer-deps
npm run start:dev
```


![image](https://github.com/user-attachments/assets/e0539821-d81f-4959-97c0-26fed58febbe)




![image](https://github.com/user-attachments/assets/a78b3c65-32c3-4bfd-a6c6-80a44375cbfa)


---

### 🛠️ Configuração de Banco SQL Server

#### 1. Criação de login e usuário no SQL Server (SSMS):

```sql
USE master;
GO
CREATE LOGIN nestjsUser WITH PASSWORD = 'nestjsPassword123';
GO

USE rh_candidatos;
GO
CREATE USER nestjsUser FOR LOGIN nestjsUser;
GO
ALTER ROLE db_owner ADD MEMBER nestjsUser;
GO
```

#### 2. ❌ Excluir login/usuário se já existir:

> Caso ocorra o erro `A entidade de segurança do servidor 'nestjsUser' já existe.`, utilize:

```sql
-- Remover USER do banco de dados se existir
USE rh_candidatos;
GO
IF EXISTS (SELECT * FROM sys.database_principals WHERE name = 'nestjsUser')
    DROP USER nestjsUser;
GO

-- Remover LOGIN do servidor se existir
USE master;
GO
IF EXISTS (SELECT * FROM sys.server_principals WHERE name = 'nestjsUser')
    DROP LOGIN nestjsUser;
GO
```

Depois disso, você poderá rodar os scripts de criação normalmente.

---

### 🔯 Problemas Comuns Resolvidos

#### 1. `Cannot find module` em controllers/services

**Solução:** Caminhos de import incorretos. Use:

```ts
import { AppService } from './app.service';
```

---

#### 2. `has no exported member`

**Solução:** Exporte corretamente:

```ts
export const poolPromise = ...
```

---

#### 3. `getHello()` inexistente

**Solução:** Atualize `AppController` e testes para usar os métodos reais (`create`, `updateByCpf`, `findAll`).

---

#### 4. Jest não reconhece `describe`, `it`, etc.

**Solução:**

```bash
npm install --save-dev @types/jest ts-jest jest
```

---

#### 5. Conflito de versão `@nestjs/swagger` e `@nestjs/common`

**Solução:**

```bash
npm install --legacy-peer-deps
# ou
npm install @nestjs/swagger@11.1.1
```

---

#### 6. Problemas com `AppModule`

**Solução:** Verifique os módulos registrados:

```ts
@Module({
  imports: [CandidatosModule],
  controllers: [AppController, CandidatosController],
  providers: [AppService, CandidatosService, DatabaseProvider],
})
```

---

#### 7. Erro de `VersioningOptions` (versões incompatíveis)

**Solução:** Certifique-se de que `@nestjs/core` e `@nestjs/common` estão na **mesma versão**. Evite misturar v10 e v11.

---

#### 8. Porta 3001 já em uso

**Solução:**

```bash
npx kill-port 3001
```

---

### 💡 Modos :

- Use **caminhos relativos** corretos nos imports.
- Ative as extensões **ESLint** e **Prettier** no VS Code.
- Se der erro estranho, reinstale as dependências:

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```
