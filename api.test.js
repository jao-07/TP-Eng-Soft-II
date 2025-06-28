const API_BASE_URL = 'http://localhost:3000';

async function makeRequest(url, options = {}) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    });
    
    let data;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
        data = await response.json();
    } else {
        data = await response.text();
    }
    
    return {
        status: response.status,
        ok: response.ok,
        data,
        headers: response.headers
    };
}

describe('API Integration Tests', () => {
    
    describe('GET /visitas', () => {
        test('deve retornar todas as visitas com sucesso (status 200)', async () => {
            const response = await makeRequest(`${API_BASE_URL}/visitas`);
            
            expect(response.status).toBe(200);
            expect(response.ok).toBe(true);
            expect(Array.isArray(response.data)).toBe(true);
            
            if (response.data.length > 0) {
                expect(response.data[0]).toHaveProperty('endereco');
                expect(response.data[0]).toHaveProperty('inicio');
                expect(response.data[0]).toHaveProperty('fim');
            }
        });
    });

    describe('POST /visitas', () => {
        test('deve criar uma nova visita', async () => {
            const newVisit = {
                endereco: "Rua Test API, 123",
                inicio: "08:00:00",
                fim: "09:00:00"
            };
            
            const response = await makeRequest(`${API_BASE_URL}/visitas`, {
                method: 'POST',
                body: JSON.stringify(newVisit)
            });

            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty('id');
            expect(response.data.endereco).toBe(newVisit.endereco);
            expect(response.data.inicio).toBe(newVisit.inicio);
            expect(response.data.fim).toBe(newVisit.fim);
            expect(response.data).toHaveProperty('createdAt');
            expect(response.data).toHaveProperty('updatedAt');
        });

        test('deve retornar erro (status 400) por não conter todos os campos', async () => {
            const invalidVisit = {
                endereco: "Rua ABC"
                // Sem inicio e fim
            };

            const response = await makeRequest(`${API_BASE_URL}/visitas`, {
                method: 'POST',
                body: JSON.stringify(invalidVisit)
            });

            expect(response.status).toBe(400);
            expect(response.data).toHaveProperty('erro');
        });

        test('deve retornar erro 400 por conteudo vazio', async () => {
            const response = await makeRequest(`${API_BASE_URL}/visitas`, {
                method: 'POST',
                body: JSON.stringify({})
            });

            expect(response.status).toBe(400);
            expect(response.data).toHaveProperty('erro');
        });
    });

    describe('DELETE /visitas', () => {
        test('deve deletar uma visita', async () => {
            const visitToDelete = {
                endereco: "Rua Delete Test, 456",
                inicio: "10:00:00",
                fim: "11:00:00"
            };

            const createResponse = await makeRequest(`${API_BASE_URL}/visitas`, {
                method: 'POST',
                body: JSON.stringify(visitToDelete)
            });
            expect(createResponse.status).toBe(201);

            const deleteResponse = await makeRequest(`${API_BASE_URL}/visitas`, {
                method: 'DELETE',
                body: JSON.stringify(visitToDelete)
            });

            expect(deleteResponse.status).toBe(204);
        });

        test('deve retornar status 404 por deletar uma visita não existente', async () => {
            const nonExistentVisit = {
                endereco: "Rua Non Ecziste, 666",
                inicio: "23:00:00",
                fim: "23:59:00"
            };

            const response = await makeRequest(`${API_BASE_URL}/visitas`, {
                method: 'DELETE',
                body: JSON.stringify(nonExistentVisit)
            });

            expect(response.status).toBe(404);
        });
    });


});
