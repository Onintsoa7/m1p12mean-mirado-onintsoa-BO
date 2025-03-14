// import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context';

const angularAppEngine = new AngularAppEngine();

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext();

  // Exemple d'API endpoint (décommente si nécessaire)
  // const pathname = new URL(request.url).pathname;
  // if (pathname === '/api/hello') {
  //   return Response.json({ message: 'Hello depuis l'API' });
  // }

  const result = await angularAppEngine.handle(request, context);
  return result || new Response('Not found', { status: 404 });
}

/**
 * Gestionnaire de requêtes utilisé par Angular CLI (dev-server et build).
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
