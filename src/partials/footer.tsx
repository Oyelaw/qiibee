import React from 'react';

export default function Footer() {
  return (
    <footer className="footer d-flex flex-column flex-md-row align-items-center justify-content-between">
      <p className="text-muted text-center text-md-left">
        Copyright © {new Date().getFullYear()}
        <a href="https://www.qiibee.com/" target="_blank" rel="noreferrer">
          {' '}
          QiiBee{' '}
        </a>
        . All rights reserved
      </p>
    </footer>
  );
}
