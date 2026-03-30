import { cp, mkdir, mkdtemp, rm, symlink } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

const projectRoot = process.cwd();
const needsAsciiWorkaround =
  process.platform === 'win32' && /[^\x00-\x7F]/.test(projectRoot);

const entriesToCopy = [
  'src',
  'public',
  'index.html',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'vite.config.ts',
];

async function copySeoProjectPages(targetRoot) {
  await cp(path.join(projectRoot, 'public', 'projects'), path.join(targetRoot, 'dist', 'projects'), {
    recursive: true,
    force: true,
  });
}

function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child =
      process.platform === 'win32'
        ? spawn(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', `${command} ${args.join(' ')}`], {
            cwd,
            stdio: 'inherit',
          })
        : spawn(command, args, {
            cwd,
            stdio: 'inherit',
          });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(' ')} exited with code ${code ?? 'unknown'}`));
    });
  });
}

async function buildInCurrentDirectory() {
  await run('npm', ['run', 'build:site'], projectRoot);
  await copySeoProjectPages(projectRoot);
}

async function buildInAsciiTempDirectory() {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'portfolio-build-'));
  const tempProjectRoot = path.join(tempRoot, 'site');

  await mkdir(tempProjectRoot, { recursive: true });

  for (const entry of entriesToCopy) {
    await cp(path.join(projectRoot, entry), path.join(tempProjectRoot, entry), {
      recursive: true,
    });
  }

  await symlink(
    path.join(projectRoot, 'node_modules'),
    path.join(tempProjectRoot, 'node_modules'),
    'junction',
  );

  try {
    await run('npm', ['run', 'build:site'], tempProjectRoot);

    await rm(path.join(projectRoot, 'dist'), { recursive: true, force: true });
    await cp(path.join(tempProjectRoot, 'dist'), path.join(projectRoot, 'dist'), {
      recursive: true,
    });
    await copySeoProjectPages(projectRoot);
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

try {
  await run('node', ['scripts/generate-seo-pages.mjs'], projectRoot);

  if (needsAsciiWorkaround) {
    console.log('Windows 한글 경로를 감지해 임시 ASCII 경로에서 빌드를 실행합니다.');
    await buildInAsciiTempDirectory();
  } else {
    await buildInCurrentDirectory();
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}
