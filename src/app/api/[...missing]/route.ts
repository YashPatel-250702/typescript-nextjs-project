import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function GET(req: NextRequest) {
  return getRouteNotFoundResponse();
}

export function POST(req: NextRequest) {
  return getRouteNotFoundResponse();
}

export function PUT(req: NextRequest) {
  return getRouteNotFoundResponse();
}

export function DELETE(req: NextRequest) {
  return getRouteNotFoundResponse();
}

function getRouteNotFoundResponse() {
  return NextResponse.json({ error: 'API route not found' }, { status: 404 });
}
