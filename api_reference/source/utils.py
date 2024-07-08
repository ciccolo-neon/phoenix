# Define the modules and members to include in Sphinx documentation
INCLUDE_MEMBERS = {
    "inferences.inferences": {"Inferences": ["__init__"]},
}


def clean_doc_output(app, docname, source):
    """
    Process .rst sources generated by autodoc to remove unwanted text outside
    automodule blocks and adjust formatting for Sphinx.
    """

    if source:
        processed, in_automodule = [], False
        for line in source[0].split("\n"):
            # Check for the start of the automodule block
            if ".. automodule::" in line:
                in_automodule = True

            # Check if we are still in the automodule block
            if in_automodule and line.strip() == "":
                processed.append(line)
                continue

            # Check if we are out of the automodule block
            if in_automodule and line.strip() and not line.startswith("   "):
                in_automodule = False

            # Clean up text outside automodule blocks
            if not in_automodule:
                if "Submodules" in line:
                    continue 
                if "package" in line:
                    line = line.replace(" package", "")
                if "module" in line:
                    line = line.replace(" module", "")
                if "Subpackages" in line:
                    line = line.replace("Subpackages", "")

            processed.append(line)

        source[0] = "\n".join(processed)

