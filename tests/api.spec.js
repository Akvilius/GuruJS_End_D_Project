import { test, expect } from '@playwright/test';
import { ChallengerService, ChallengesService, TodosService, HeartbeatService, SecretService }  from '../src/service/index';
import { TodosBuilder, HeaderBuilder } from '../src/helpers/api/index';
require('dotenv').config();

let token;
const oldGuid = '62a63304-d598-4430-9cf5-2e52948d7421';

test.describe ('Challenge', ()=>{

 //1   
    test.beforeAll(async ({request}) => {

        const challengerService = new ChallengerService(request);
        const response = await challengerService.post();
        expect (response.status()).toBe(201);
        const headers = await response.headers();
        token = headers['x-challenger'];
        console.log('Это токен: '+token);
    });
//2
    test('GET /challenges (200)', {tag: '@FirstReal'}, async ({request})=>{ 
        const challengesService = new ChallengesService(request);
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const response = await challengesService.get(header);
        const body = await response.json();
        expect (response.status()).toBe(200);
        expect (body.challenges.length).toBe(59);
    });
//3
    test('GET /todos (200)', {tag: '@GET'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const todosService = new TodosService(request);
        const response = await todosService.getTodos(header);
        expect (response.status()).toBe(200);
    });
//4
    test('GET /todo (404) not plural', {tag: '@GET'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const todoService = new TodosService(request);
        const response = await todoService.getTodo(header);
        expect (response.status()).toBe(404);
        expect(response.statusText()).toBe('Not Found');
    });
//5
    test('GET /todos/{id} (200)', {tag: '@GET'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const todoidService = new TodosService(request);
        const response = await todoidService.getTodosId(header,1);
        expect (response.status()).toBe(200);
    });
//6
    test('GET /todos/{id} (404)', {tag: '@GET'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const todoidService = new TodosService(request);
        const response = await todoidService.getTodosId(header,99);
        expect (response.status()).toBe(404);
        expect(response.statusText()).toBe('Not Found');
    });
//7
    test('GET /todos (200) ?filter', {tag: '@GET'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const postTodosService = new TodosService(request);
        const body = new TodosBuilder().addTitle().addDoneStatus().addDescription().genereteTodos();
        await postTodosService.postTodos(header,body);
        const todosService = new TodosService(request);
        const response = await todosService.getTodos(header,'?doneStatus=true');
        expect (response.status()).toBe(200);
        const bodyData = await response.json();
        expect(bodyData.todos.every((todo) => todo.doneStatus === true)).toBeTruthy();
    });
//8
    test('	HEAD /todos (200)', {tag: '@HEAD'}, async({ request }) => {
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const todosService = new TodosService(request);
        const response = await todosService.headTodos(header);
        expect (response.status()).toBe(200);
    });
 //9   
    test('POST /todos/ (201)',{tag: '@POST'}, async({ request }) => {
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const postTodosService = new TodosService(request);
        const body = new TodosBuilder().addTitle().addDoneStatus().addDescription().genereteTodos();
        const response = await postTodosService.postTodos(header,body);
        expect (response.status()).toBe(201);
        expect((await response.json()).title).toContain(body.title);

    });
//10
    test('POST /todos/ (400) doneStatus',{tag: '@POST'}, async({ request }) => {
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const body = new TodosBuilder().addTitle(2).addDoneStatus(10).addDescription(1).genereteTodos();
        const postTodosService = new TodosService(request);
        const response = await postTodosService.postTodos(header,body);
        expect (response.status()).toBe(400);
        expect(response.statusText()).toBe('Bad Request');
        expect((await response.json()).errorMessages).toContainEqual(expect.stringContaining("doneStatus"));
    });
//11
    test('POST /todos (400) title too long',{tag: '@POST'}, async({ request }) => {
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const body = new TodosBuilder().addTitle(100).addDoneStatus().addDescription(50).genereteTodos();
        const postTodosService = new TodosService(request);
        const response = await postTodosService.postTodos(header,body);
        expect (response.status()).toBe(400);

    });
//12
    test('POST /todos (400) description too long',{tag: '@POST'}, async({ request }) => {
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const body = new TodosBuilder().addTitle(20).addDoneStatus().addDescription(201).genereteTodos();
        const postTodosService = new TodosService(request);
        const response = await postTodosService.postTodos(header,body);
        expect (response.status()).toBe(400);
    });
//13
    test('POST /todos (201) max out content',{tag: '@POST'}, async({ request }) => {
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const body = new TodosBuilder().addTitle(50).addDoneStatus().addDescription(200).genereteTodos();
        const postTodosService = new TodosService(request);
        const response = await postTodosService.postTodos(header,body);
        expect (response.status()).toBe(201);
    });
//14
    test('POST /todos (413) content too long',{tag: '@POST'}, async({ request }) => {
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const body = new TodosBuilder().addTitle(20).addDoneStatus().addDescription(5001).genereteTodos();
        const postTodosService = new TodosService(request);
        const response = await postTodosService.postTodos(header,body);
        expect (response.status()).toBe(413);
    });
//15
    test('POST /todos (400) extra',{tag: '@POST'}, async({ request }) => {
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const body = new TodosBuilder().addTitle(20).addDoneStatus().addDescription(50).genereteTodos();
        body.extra = '';
        const postTodosService = new TodosService(request);
        const response = await postTodosService.postTodos(header,body);
        expect (response.status()).toBe(400);
    });

//16
    test('PUT /todos/{id} (400)', {tag: '@CreationPUT'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const body = new TodosBuilder().addTitle().addDoneStatus().addDescription().genereteTodos();
        const todoidService = new TodosService(request);
        const todosList = await todoidService.getTodos(header);
        const count = await todosList.json();
        const response = await todoidService.putTodos(header,body,count.todos.length+10);
        expect (response.status()).toBe(400);
    });
//17
    test('POST /todos/{id} (200)', {tag: '@UpdatePOST'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const body = new TodosBuilder().addTitle().addDoneStatus().addDescription().genereteTodos();
        const todoidService = new TodosService(request);
        const response = await todoidService.postTodosId(header,body,1);
        expect (response.status()).toBe(200);
    });
//18
    test('POST /todos/{id} (404)', {tag: '@UpdatePOST'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const body = new TodosBuilder().addTitle().addDoneStatus().addDescription().genereteTodos();
        const todoidService = new TodosService(request);
        const todosList = await todoidService.getTodos(header);
        const count = await todosList.json();
        const response = await todoidService.postTodosId(header,body,count.todos.length+10);
        expect (response.status()).toBe(404);
    });
//19
    test('PUT /todos/{id} full (200)', {tag: '@UpdatePUT'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const body = new TodosBuilder().addTitle().addDoneStatus().addDescription().genereteTodos();
        const todoidService = new TodosService(request);
        const response = await todoidService.putTodos(header,body,1);
        expect (response.status()).toBe(200);
    });
//20
    test('PUT /todos/{id} partial (200)', {tag: '@UpdatePUT'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const body = new TodosBuilder().addTitle().genereteTodos();
        const todoidService = new TodosService(request);
        const todosList = await todoidService.getTodos(header);
        const count = await todosList.json();
        const response = await todoidService.putTodos(header,body,count.todos.length-1);
        expect (response.status()).toBe(200);
    });
//21
    test('PUT /todos/{id} no title (400)', {tag: '@UpdatePUT'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const body = new TodosBuilder().addDoneStatus().addDescription().genereteTodos();
        const todoidService = new TodosService(request);
        const todosList = await todoidService.getTodos(header);
        const count = await todosList.json();
        const response = await todoidService.putTodos(header,body,count.todos.length-1);
        expect (response.status()).toBe(400);
    });
//22
    test('PUT /todos/{id} no amend id (400)', {tag: '@UpdatePUT'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const body = new TodosBuilder().addTitle().addDoneStatus().addDescription().genereteTodos();
        body.id = 1;
        const todoidService = new TodosService(request);
        const todosList = await todoidService.getTodos(header);
        const count = await todosList.json();
        const response = await todoidService.putTodos(header,body,count.todos.length-1);
        expect (response.status()).toBe(400);
    });
//23
    test('DELETE /todos/{id} (200)', {tag: '@DELETE'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const todoidService = new TodosService(request);
        const todosList = await todoidService.getTodos(header);
        const count = await todosList.json();
        const response = await todoidService.deleteTodos(header,count.todos.length-1);
        expect (response.status()).toBe(200);
    });
//25
    test('GET /todos (200) XML', {tag: '@Accept'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).addAccept(`application/xml`).genereteHeader();
        const todosService = new TodosService(request);
        const response = await todosService.getTodos(header);
        expect (response.status()).toBe(200);
    });

//26
    test('GET /todos (200) JSON', {tag: '@Accept'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).addAccept(`application/json`).genereteHeader();
        const todosService = new TodosService(request);
        const response = await todosService.getTodos(header);
        expect (response.status()).toBe(200);
    });
 //25
    test('GET /todos (200) ANY', {tag: '@Accept'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).addAccept(`*/*`).genereteHeader();
        const todosService = new TodosService(request);
        const response = await todosService.getTodos(header);
        expect (response.status()).toBe(200);
    });

//28
    test('GET /todos (200) XML pref', {tag: '@Accept'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).addAccept(`application/xml, application/json`).genereteHeader();
        const todosService = new TodosService(request);
        const response = await todosService.getTodos(header);
        expect (response.status()).toBe(200);
    });
//29
     test('GET /todos (200) no accept', {tag: '@Accept'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).addAccept(``).genereteHeader();
        const todosService = new TodosService(request);
        const response = await todosService.getTodos(header);
        expect (response.status()).toBe(200);
    });
//30
     test('GET /todos (406)', {tag: '@Accept'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).addAccept(`application/gzip`).genereteHeader();
        const todosService = new TodosService(request);
        const response = await todosService.getTodos(header);
        expect (response.status()).toBe(406);
    });
//31
     test('POST /todos XML', {tag: '@ContentType'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).addAccept(`application/xml`).addContent('application/xml').genereteHeader();
        const body = `
        <todo>
        <doneStatus>true</doneStatus>
        <description>test</description>
        <title>Create</title>
        </todo>`;
        const todosService = new TodosService(request);
        const response = await todosService.postTodos(header,body);
        expect (response.status()).toBe(201);
    });
//32
    test('POST /todos JSON', {tag: '@ContentType'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).addAccept(`application/json`).addContent('application/json').genereteHeader();
        const todosService = new TodosService(request);
        const body = new TodosBuilder().addTitle(3).addDoneStatus().addDescription(1).genereteTodos();
        const response = await todosService.postTodos(header,body);
        expect (response.status()).toBe(201);
    });
//33
    test('POST /todos (415)', {tag: '@ContentType'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).addAccept(`application/json`).addContent('application/gzip').genereteHeader();
        const todosService = new TodosService(request);
        const body = new TodosBuilder().addTitle(3).addDoneStatus().addDescription(1).genereteTodos();
        const response = await todosService.postTodos(header,body);
        expect (response.status()).toBe(415);
    });
//34
    test('GET /challenger/guid (existing X-CHALLENGER)', {tag: '@Restore'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const challengerService = new ChallengerService(request);
        const response = await challengerService.getChallengerGuid(header,token);
        expect (response.status()).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty("challengeStatus");
        expect(data.xChallenger).toEqual(token);
    });

//35
    test('PUT /challenger/guid RESTORE', {tag: '@Restore'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const challengerService = new ChallengerService(request);
        const responseGet = await challengerService.getChallengerGuid(header,token);
        const data = await responseGet.json();
        const response = await challengerService.putChallengerGuid(header,data,token);
        expect (response.status()).toBe(200);
    });
//36
    test('PUT /challenger/guid CREATE', {tag: '@Restore'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const headerOld = new HeaderBuilder().addToken(token).genereteHeader();
        const challengerService = new ChallengerService(request);
        const responseGet = await challengerService.getChallengerGuid(header,token);
        const data = await responseGet.json();
        data['xChallenger'] = oldGuid;
        delete data.xAuthToken;
        const response = await challengerService.putChallengerGuid(headerOld,data,oldGuid);
        expect (response.status()).toBe(201);// 200 если существует, повторный прогон
    });
//37
    test('GET /challenger/database/guid (200)', {tag: '@Restore'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const challengerService = new ChallengerService(request);
        const response = await challengerService.getDatabaseGuid(header,token);
        expect (response.status()).toBe(200);
    });
//38
    test('PUT /challenger/database/guid (Update)', {tag: '@Restore'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const challengerService = new ChallengerService(request);
        const responseGet = await challengerService.getDatabaseGuid(header,token);
        const data = await responseGet.json();
        const response = await challengerService.putDatabaseGuid(header,data,token);
        expect (response.status()).toBe(204);
    });

//39
    test('POST /todos XML to JSON', {tag: '@MixAccept'}, async ({request})=>{ 
    const header = new HeaderBuilder().addToken(token).addAccept(`application/json`).addContent('application/xml').genereteHeader();
    const body = `
        <todo>
        <doneStatus>true</doneStatus>
        <description>test 006</description>
        <title>Create or not</title>
        </todo>`;
        const todosService = new TodosService(request);
        const response = await todosService.postTodos(header,body);
        expect (response.status()).toBe(201);
    });
//40
    test('POST /todos JSON to XML', {tag: '@MixAccept'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).addAccept(`application/xml`).addContent('application/json').genereteHeader();
        const todosService = new TodosService(request);
        const body = new TodosBuilder().addTitle(2).addDoneStatus().addDescription().genereteTodos();
        const response = await todosService.postTodos(header,body);
        expect (response.status()).toBe(201);
    });
//41
    test('DELETE /heartbeat (405)', {tag: '@StatusCode'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const heartbeatService = new HeartbeatService(request);
        const response = await heartbeatService.deleteHeartbeat(header);
        expect (response.status()).toBe(405);
    });
//42
    test('PATCH /heartbeat (500)', {tag: '@StatusCode'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const heartbeatService = new HeartbeatService(request);
        const response = await heartbeatService.patchHeartbeat(header);
        expect (response.status()).toBe(500);
    });
//43
    test('TRACE /heartbeat (501)', {tag: '@StatusCode'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const heartbeatService = new HeartbeatService(request);
        const response = await heartbeatService.traceHeartbeat(header);
        expect (response.status()).toBe(501);
    });
//44
    test('GET /heartbeat (204)', {tag: '@StatusCode'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const heartbeatService = new HeartbeatService(request);
        const response = await heartbeatService.getHeartbeat(header);
        expect (response.status()).toBe(204);
    });
//45
    test('POST /heartbeat as DELETE (405)', {tag: '@HTTP'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).addHttpMethod('DELETE').genereteHeader();
        const heartbeatService = new HeartbeatService(request);
        const response = await heartbeatService.postHeartbeat(header);
        expect (response.status()).toBe(405);
    });
//46
    test('POST /heartbeat as PATCH (500)', {tag: '@HTTP'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).addHttpMethod('PATCH').genereteHeader();
        const heartbeatService = new HeartbeatService(request);
        const response = await heartbeatService.postHeartbeat(header);
        expect (response.status()).toBe(500);
    });
//47
    test('POST /heartbeat as Trace (501)', {tag: '@HTTP'}, async ({request})=>{ 

        const header = new HeaderBuilder().addToken(token).addHttpMethod('TRACE').genereteHeader();
        const heartbeatService = new HeartbeatService(request);
        const response = await heartbeatService.postHeartbeat(header);
        expect (response.status()).toBe(501);
    });
//48
    test('POST /secret/token (401)', {tag: '@Authentication'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).addAuth("Basic " + Buffer.from("Admin1:Pa55word").toString("base64")).genereteHeader();
        const secretService = new SecretService(request);
        const response = await secretService.postSecret(header);
        expect (response.status()).toBe(401);
    });
//49
    test('POST /secret/token (201)', {tag: '@Authentication'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).addAuth("Basic " + Buffer.from("admin:password").toString("base64")).genereteHeader();
        const secretService = new SecretService(request);
        const response = await secretService.postSecret(header);
        expect (response.status()).toBe(201);
    });
//50
    test('GET /secret/note (403)', {tag: '@Authorization'}, async ({request})=>{ 
        const secretService = new SecretService(request);
        const header = new HeaderBuilder().addToken(token).addXAuth('authToken+2').genereteHeader();
        const response = await secretService.getSecretNote(header);
        expect (response.status()).toBe(403);
    });
//51
    test('	GET /secret/note (401)', {tag: '@Authorization'}, async ({request})=>{ 
        const secretService = new SecretService(request);
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const response = await secretService.getSecretNote(header);
        expect (response.status()).toBe(401);
    });
//52
    test('GET /secret/note (200)', {tag: '@Authorization'}, async ({request})=>{ 
        const authheader = new HeaderBuilder().addToken(token).addAuth("Basic " + Buffer.from("admin:password").toString("base64")).genereteHeader();
        const secretService = new SecretService(request);
        const authToken = ((await secretService.postSecret(authheader)).headers())["x-auth-token"];;
        const header = new HeaderBuilder().addToken(token).addXAuth(authToken).genereteHeader();
        const response = await secretService.getSecretNote(header);
        expect (response.status()).toBe(200);
    });
//53
    test('POST /secret/note (200)', {tag: '@Authorization'}, async ({request})=>{ 
        const secretService = new SecretService(request);
        const authheader = new HeaderBuilder().addToken(token).addAuth("Basic " + Buffer.from("admin:password").toString("base64")).genereteHeader();
        const authToken = ((await secretService.postSecret(authheader)).headers())["x-auth-token"];
        const header = new HeaderBuilder().addToken(token).addXAuth(authToken).addContent('application/json').genereteHeader();
        const body = {note: "whot is it?"};
        const response = await secretService.postSecretNote(header,body);
        expect (response.status()).toBe(200);
    });
//54
    test('POST /secret/note (401)', {tag: '@Authorization'}, async ({request})=>{ 
        const secretService = new SecretService(request);
        const header = new HeaderBuilder().addToken(token).addContent('application/json').genereteHeader();
        const body = {note: "whot is it?"};
        const response = await secretService.postSecretNote(header,body);
        expect (response.status()).toBe(401);
    });
//55
    test('POST /secret/note (403)', {tag: '@Authorization'}, async ({request})=>{ 
        const secretService = new SecretService(request);
        const header = new HeaderBuilder().addToken(token).addXAuth(`authToken`).addContent('application/json').genereteHeader();
        const body = {note: "whot is it?"};
        const response = await secretService.postSecretNote(header,body);
        expect (response.status()).toBe(403);
    });
//56
    test('GET /secret/note (Bearer)', {tag: '@Authorization'}, async ({request})=>{ 
        const secretService = new SecretService(request);
        const authheader = new HeaderBuilder().addToken(token).addAuth("Basic " + Buffer.from("admin:password").toString("base64")).genereteHeader();
        const authToken = ((await secretService.postSecret(authheader)).headers())["x-auth-token"];
        const header = new HeaderBuilder().addToken(token).addAuth(`Bearer ${authToken}`).genereteHeader();
        const response = await secretService.getSecretNote(header);
        expect (response.status()).toBe(200);
    });
//57
    test('POST /secret/note (Bearer)', {tag: '@Authorization'}, async ({request})=>{ 
        const secretService = new SecretService(request);
        const authheader = new HeaderBuilder().addToken(token).addAuth("Basic " + Buffer.from("admin:password").toString("base64")).genereteHeader();
        const authToken = ((await secretService.postSecret(authheader)).headers())["x-auth-token"];
        const header = new HeaderBuilder().addToken(token).addAuth(`Bearer ${authToken}`).genereteHeader();
        const body = {note: "whot is it?"};
        const response = await secretService.postSecretNote(header,body);
        expect (response.status()).toBe(200);;
    });
//58
    test('DELETE /todos/{id} (200) all', {tag: '@Miscellaneous'}, async ({request})=>{ 
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const todoidService = new TodosService(request);
        let todosList = await todoidService.getTodos(header);
        let count = (await todosList.json()).todos ;
        for (const num of count) {
            await todoidService.deleteTodos(header,num.id);
        }
        todosList = await todoidService.getTodos(header);
        count = await todosList.json();
        expect (count.todos.length).toBe(0);
    });
//59   
    test('POST /todos (201) all', {tag: '@Miscellaneous'}, async({ request }) => {
        const header = new HeaderBuilder().addToken(token).genereteHeader();
        const postTodosService = new TodosService(request);
        const todosToCreate = new TodosService(request);
        const body = new TodosBuilder().addTitle().addDoneStatus().addDescription().genereteTodos();
        const responseget = await todosToCreate.getTodos(header);
        let toCreate = (await responseget.json()).todos.length;
        while (toCreate < 20) {
            await postTodosService.postTodos(header,body);
            toCreate++;
        }
        const response = await postTodosService.postTodos(header,body);
        expect (response.status()).toBe(400);
        expect(response.statusText()).toBe('Bad Request');
    });
});
