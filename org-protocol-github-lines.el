;;; org-protocol-github-lines.el --- Open files and lines in emacs from your browser (when on github)

;; Copyright (C) 2012  Raimon Grau

;; Author: Raimon Grau <raimonster@gmail.com>
;; Keywords: tools, extensions

;; This program is free software; you can redistribute it and/or modify
;; it under the terms of the GNU General Public License as published by
;; the Free Software Foundation, either version 3 of the License, or
;; (at your option) any later version.

;; This program is distributed in the hope that it will be useful,
;; but WITHOUT ANY WARRANTY; without even the implied warranty of
;; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
;; GNU General Public License for more details.

;; You should have received a copy of the GNU General Public License
;; along with this program.  If not, see <http://www.gnu.org/licenses/>.

;;; Commentary:

;;

;;; Code:
(require 'org-protocol)
(require 'cl-macs)

(defgroup org-protocol-github nil
  "Browser to Emacs interface for GitHub"
  :prefix "org-protocol-github-"
  :group 'tools)

(defcustom org-protocol-github-projects nil
  "Map of GitHub projects to directories.
See also `org-protocol-github-project-directories'."
  :group 'org-protocol-github
  :type '(repeat (cons (string :tag "GitHub project name (user/project)")
                       (directory :tag "Project directory"))))

(defcustom org-protocol-github-project-directories (list temporary-file-directory)
  "List of directories where projects are stored.
See also `org-protocol-github-projects'."
  :group 'org-protocol-github
  :type '(repeat directory))

(defun org-protocol-github--find-project-directory (user project)
  "Find the github project specified by USER and PROJECT.
If there is no mapping in `org-protocol-github-projects' then
`org-protocol-github-project-directories' is searched for a directory named
after the project."
  (let ((key (concat user "/" project)))
    (or
     (cdr (assoc key org-protocol-github-projects))
     (cl-loop for d in org-protocol-github-project-directories
              with file-name
              do (setq file-name (expand-file-name project
                                                   (file-name-as-directory d)))
              when (file-exists-p file-name)
                return file-name))))

;;;###autoload
(defun org-protocol-github-lines (data)
  "Handle github-lines protocol.
DATA contains the user/project/file/line information."
  (let* ((content (org-protocol-split-data data t))
         (user (car content))
         (project (cadr content))
	 (file (butlast (cddr content)))
	 (line (car (last content)))
         (dir (org-protocol-github--find-project-directory user
                                                           project)))
    (message "%s" content)
    (unless dir
      (error "Project %s/%s not found on local machine." user project))
    (with-current-buffer
        (find-file
         (mapconcat 'identity (cons dir file) "/"))
      (when line
        (goto-char (point-min))
        (forward-line (1- (string-to-number line))))))
  nil)

(defun org-protocol-clone-repo (data server)
  (let* ((content (org-protocol-split-data data t))
	(user (car content))
	(project (cadr content))
	(dir (org-protocol-github--find-project-directory user
							  project)))
    (if dir
	(message "repo %s/%s is already in" user project)
      (org-protocol--clone user project server))
    (format "%s%s/" (car org-protocol-github-project-directories) project)))

(defun org-protocol--clone (user project server)
  (let ((default-directory  (car org-protocol-github-project-directories)))
    (async-shell-command (format "git clone git@%s:%s/%s.git" server user project))))

(defun org-protocol-github-repo (data)
  (org-protocol-clone-repo data "github.com"))

(defun org-protocol-bitbucket-repo (data)
  (org-protocol-clone-repo data "bitbucket.org"))

;;;###autoload
(add-to-list 'org-protocol-protocol-alist
             '("Open files from GitHub."
               :protocol "github-lines"
               :function org-protocol-github-lines))

;;;###autoload
(add-to-list 'org-protocol-protocol-alist
             '("Clone repos from GitHub."
               :protocol "github-clone"
               :function org-protocol-github-repo))

;;;###autoload
(add-to-list 'org-protocol-protocol-alist
             '("Clone repos from Bitbucket."
               :protocol "bitbucket-clone"
               :function org-protocol-bitbucket-repo))

(provide 'org-protocol-github-lines)
;;; org-protocol-github-lines.el ends here
