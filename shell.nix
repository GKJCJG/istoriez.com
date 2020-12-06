{ pkgs ? import <nixpkgs> {} }:

let
  # This will override the `npm` binary to `npm
  # --build-from-source`. Mainly because I'm angry at npm for running
  # random binaries without asking.
  npm = pkgs.writeShellScriptBin "npm" ''
    ${pkgs.nodejs}/bin/npm $@ --build-from-source
  '';
in pkgs.mkShell {
  # Things to be put in $PATH
  nativeBuildInputs = with pkgs; [ npm python2 nodejs ];

  # Libraries to be installed
  buildInputs = with pkgs; [];
}
