import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

type UserRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

type SessionRecord = {
  id: string;
  userId: string;
  createdAt: string;
};

type OrganisationRecord = {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
};

type ProjectRecord = {
  id: string;
  organisationId: string;
  name: string;
  description?: string;
  createdAt: string;
};

type ObligationRecord = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  createdAt: string;
};

type UploadRecord = {
  id: string;
  filename: string;
  originalName: string;
  size: number;
  uploadedAt: string;
};

type StoreSchema = {
  users: UserRecord[];
  sessions: SessionRecord[];
  organisations: OrganisationRecord[];
  projects: ProjectRecord[];
  obligations: ObligationRecord[];
  uploads: UploadRecord[];
};

const dataDir = path.join(process.cwd(), "data");
const storePath = path.join(dataDir, "store.json");

const defaultStore: StoreSchema = {
  users: [],
  sessions: [],
  organisations: [],
  projects: [],
  obligations: [],
  uploads: []
};

async function ensureStore(): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(storePath);
  } catch {
    await fs.writeFile(storePath, JSON.stringify(defaultStore, null, 2));
  }
}

async function readStore(): Promise<StoreSchema> {
  await ensureStore();
  const data = await fs.readFile(storePath, "utf-8");
  return JSON.parse(data) as StoreSchema;
}

async function writeStore(store: StoreSchema): Promise<void> {
  await fs.writeFile(storePath, JSON.stringify(store, null, 2));
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<UserRecord> {
  const store = await readStore();
  const user: UserRecord = {
    id: randomUUID(),
    name: input.name,
    email: input.email.toLowerCase(),
    passwordHash: input.passwordHash,
    createdAt: new Date().toISOString()
  };
  store.users.push(user);
  await writeStore(store);
  return user;
}

export async function findUserByEmail(email: string): Promise<UserRecord | undefined> {
  const store = await readStore();
  return store.users.find((user) => user.email === email.toLowerCase());
}

export async function findUserById(id: string): Promise<UserRecord | undefined> {
  const store = await readStore();
  return store.users.find((user) => user.id === id);
}

export async function createSession(userId: string): Promise<SessionRecord> {
  const store = await readStore();
  const session: SessionRecord = {
    id: randomUUID(),
    userId,
    createdAt: new Date().toISOString()
  };
  store.sessions.push(session);
  await writeStore(store);
  return session;
}

export async function getSession(sessionId: string): Promise<SessionRecord | undefined> {
  const store = await readStore();
  return store.sessions.find((session) => session.id === sessionId);
}

export async function deleteSession(sessionId: string): Promise<void> {
  const store = await readStore();
  store.sessions = store.sessions.filter((session) => session.id !== sessionId);
  await writeStore(store);
}

export async function createOrganisation(input: {
  name: string;
  ownerId: string;
}): Promise<OrganisationRecord> {
  const store = await readStore();
  const organisation: OrganisationRecord = {
    id: randomUUID(),
    name: input.name,
    ownerId: input.ownerId,
    createdAt: new Date().toISOString()
  };
  store.organisations.push(organisation);
  await writeStore(store);
  return organisation;
}

export async function listOrganisations(ownerId: string): Promise<OrganisationRecord[]> {
  const store = await readStore();
  return store.organisations.filter((org) => org.ownerId === ownerId);
}

export async function createProject(input: {
  organisationId: string;
  name: string;
  description?: string;
}): Promise<ProjectRecord> {
  const store = await readStore();
  const project: ProjectRecord = {
    id: randomUUID(),
    organisationId: input.organisationId,
    name: input.name,
    description: input.description,
    createdAt: new Date().toISOString()
  };
  store.projects.push(project);
  await writeStore(store);
  return project;
}

export async function listProjects(organisationId: string): Promise<ProjectRecord[]> {
  const store = await readStore();
  return store.projects.filter((project) => project.organisationId === organisationId);
}

export async function createObligation(input: {
  projectId: string;
  title: string;
  description: string;
}): Promise<ObligationRecord> {
  const store = await readStore();
  const obligation: ObligationRecord = {
    id: randomUUID(),
    projectId: input.projectId,
    title: input.title,
    description: input.description,
    status: "NOT_STARTED",
    createdAt: new Date().toISOString()
  };
  store.obligations.push(obligation);
  await writeStore(store);
  return obligation;
}

export async function listObligations(projectId: string): Promise<ObligationRecord[]> {
  const store = await readStore();
  return store.obligations.filter((obligation) => obligation.projectId === projectId);
}

export async function updateObligationStatus(input: {
  obligationId: string;
  status: ObligationRecord["status"];
}): Promise<ObligationRecord | undefined> {
  const store = await readStore();
  const obligation = store.obligations.find(
    (item) => item.id === input.obligationId
  );
  if (!obligation) {
    return undefined;
  }
  obligation.status = input.status;
  await writeStore(store);
  return obligation;
}

export async function recordUpload(input: {
  filename: string;
  originalName: string;
  size: number;
}): Promise<UploadRecord> {
  const store = await readStore();
  const upload: UploadRecord = {
    id: randomUUID(),
    filename: input.filename,
    originalName: input.originalName,
    size: input.size,
    uploadedAt: new Date().toISOString()
  };
  store.uploads.push(upload);
  await writeStore(store);
  return upload;
}
