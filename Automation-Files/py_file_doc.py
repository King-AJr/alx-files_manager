#!/usr/bin/python3
""" This need further development
couple of error in this code
"""

import ast
import sys


class DocCommentVisitor(ast.NodeVisitor):
    def __init__(self):
        self.doc_comments = []

    def visit_FunctionDef(self, node):
        self.doc_comments.append(node.body.string)

    def visit_ClassDef(self, node):
        self.doc_comments.append(node.body.string)

    def visit_Import(self, node):
        for item in node.items:
            self.visit(item)


def is_documented(file_path):
    with open(file_path, "r") as file:
        try:
            tree = ast.parse(file.read())
        except SyntaxError:
            return False

        if not any(isinstance(node, ast.FunctionDef)
                   for node in tree.body.body):
            return False

        visitor = DocCommentVisitor()
        visitor.visit(tree)

        return len(visitor.doc_comments) > 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py file_path")
        sys.exit(1)

    file_path = sys.argv[1]
    if not is_documented(file_path):
        print(f"{file_path} is not documented.")
    else:
        print(f"{file_path} is documented.")
