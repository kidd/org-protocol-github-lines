;;; org-protocol-github-lines.el --- Open files and lines in emacs from your browser (when on github)

;; Copyright (C) 2012  kidd

;; Author: kidd <kidd@sunflower>
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

(setq org-protocol-github-project-path "/home/kidd/programmingStuff/elisp/org-protocol-github-lines/")

(defun rgc-github-comment (data)
  (let ((content (org-protocol-split-data data t)))
    (message  "%s" content)
    (with-current-buffer
	(find-file (mapconcat 'identity
			      (cons org-protocol-github-project-path (butlast content))
			      "/"))
      (goto-char (point-min))
      (forward-line (1- (string-to-number (car (last content)))))))
  nil)

(setq org-protocol-protocol-alist
      '(("Github comment"
         :protocol "github-comment"
         :function rgc-github-comment)))

(provide 'org-protocol-github-lines)
;;; org-protocol-github-lines.el ends here
