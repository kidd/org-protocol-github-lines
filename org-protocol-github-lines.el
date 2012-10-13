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

(defvar org-protocol-projects '(("kidd/org-protocol-github-lines" "/home/kidd/programmingStuff/elisp/org-protocol-github-lines/")
				("3scale/system" "/home/kidd/workspace/system")
				("clasker/clasker" "/home/kidd/programmingStuff/elisp/clasker")))

(defun rgc-github-comment (data)
  "data is the info related to the user/project/file/line of the
clicked button"
  (let* ((content (org-protocol-split-data data t))
	 (key (format "%s/%s" (car content) (cadr content)))
	 (file (butlast (cddr content)))
	 (line (car (last content))))
    (message  "%s" content)
    (with-current-buffer
	(find-file (mapconcat 'identity
			      (cons (cadr (assoc key org-protocol-projects)) file) "/"))
      (goto-char (point-min))
      (forward-line (1- (string-to-number line)))))
  nil)

(setq org-protocol-protocol-alist
      '(("Github comment"
         :protocol "github-comment"
         :function rgc-github-comment)))

(provide 'org-protocol-github-lines)
;;; org-protocol-github-lines.el ends here
