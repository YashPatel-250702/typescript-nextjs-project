import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function GET(req: NextRequest) {
    getRouteNotFoundResponse();
}

export function POST(req: NextRequest) {
    getRouteNotFoundResponse();
}
export function DELETE(req: NextRequest) {
    getRouteNotFoundResponse();
  }
  
  export function PUT(req: NextRequest) {
    getRouteNotFoundResponse();
  }

  function getRouteNotFoundResponse(){
    return NextResponse.json({ error: 'API route not found' }, { status: 404 });
  }