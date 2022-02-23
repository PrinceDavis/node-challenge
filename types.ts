import { Server as NodeSecureServer } from 'https';
import { Server as NodeServer } from 'http';

export interface Server extends NodeServer {
  ready: boolean
}

export interface SecureServer extends NodeSecureServer {
  ready: boolean
}
