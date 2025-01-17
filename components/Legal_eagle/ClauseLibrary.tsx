"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Label } from "@radix-ui/react-context-menu";
import {
  IClause,
  createClause,
  deleteClause,
  getClauses,
  updateClause,
} from "@/app/actions/clauseActions";
import { PulseLoader } from "react-spinners";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface FormData {
  title: string;
  category: string;
  goodAspect: {
    preferences: string;
    description: string;
  };
  badAspect: {
    preferences: string;
    description: string;
  };
}

const initialFormData: FormData = {
  title: "",
  category: "",
  goodAspect: {
    preferences: "",
    description: "",
  },
  badAspect: {
    preferences: "",
    description: "",
  },
};

const ClauseLibrary = () => {
  const [clauses, setClauses] = useState<IClause[]>([]);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedClause, setSelectedClause] = useState<IClause>();

  useEffect(() => {
    fetchClauses();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    aspect?: "goodAspect" | "badAspect"
  ) => {
    const { name, value } = e.target;

    if (aspect) {
      setFormData((prev) => ({
        ...prev,
        [aspect]: {
          ...prev[aspect],
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEdit = (clause: IClause) => {
    setFormData({
      title: clause.title,
      category: clause.category,
      goodAspect: {
        preferences: clause.goodAspect.preferences,
        description: clause.goodAspect.description,
      },
      badAspect: {
        preferences: clause.badAspect.preferences,
        description: clause.badAspect.description,
      },
    });
    setIsEditMode(true);
    setSelectedClause(clause);
  };

  const submitEdit = async (id: string) => {
    try {
      if (loading) return;
      setLoading(true);
      await updateClause(id, formData);
      await fetchClauses();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsEditMode(false);
    }
  };

  const removeClause = async (id: string) => {
    try {
      await deleteClause(id);
      await fetchClauses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!isCreateMode) {
      if (selectedClause) {
        if (isEditMode && selectedClause._id) {
          await submitEdit(selectedClause?._id);
        }
        return;
      }
    }
    e.preventDefault();
    try {
      if (loading) return;
      setLoading(true);
      const result = await createClause(formData);
      if (result.success) {
        setMessage("Clause added successfully!");
        clearForm();
      } else {
        setMessage("Failed to add clause");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreateMode(false);
      setLoading(false);
      await fetchClauses();
    }
  };

  const clearForm = () => {
    setFormData(initialFormData);
  };

  const fetchClauses = async () => {
    try {
      const { data } = await getClauses();
      if (Array.isArray(data)) {
        setClauses(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log({ clauses });
  const formFields = () => (
    <div className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input
          name="title"
          placeholder="Clause Title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>Category</Label>
        <Input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
        />
      </div>

      <div className="border p-4 rounded-md space-y-4">
        <h3 className="font-semibold">Good Aspects</h3>
        <div>
          <Label>Preferences</Label>
          <Input
            name="preferences"
            placeholder="Good Preferences"
            value={formData.goodAspect.preferences}
            onChange={(e) => handleInputChange(e, "goodAspect")}
          />
        </div>
        <div>
          <Label>Description</Label>
          <textarea
            name="description"
            className="w-full h-32 p-3 border rounded-md"
            placeholder="Good Aspect Description"
            value={formData.goodAspect.description}
            onChange={(e) => handleInputChange(e, "goodAspect")}
          />
        </div>
      </div>

      <div className="border p-4 rounded-md space-y-4">
        <h3 className="font-semibold">Bad Aspects</h3>
        <div>
          <Label>Preferences</Label>
          <Input
            name="preferences"
            placeholder="Bad Preferences"
            value={formData.badAspect.preferences}
            onChange={(e) => handleInputChange(e, "badAspect")}
          />
        </div>
        <div>
          <Label>Description</Label>
          <textarea
            name="description"
            className="w-full h-32 p-3 border rounded-md"
            placeholder="Bad Aspect Description"
            value={formData.badAspect.description}
            onChange={(e) => handleInputChange(e, "badAspect")}
          />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center mt-16 h-screen">
        <PulseLoader />
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[80vh] overflow-y-scroll p-4">
      <div className="relative">
        <Input
          placeholder="Search Library"
          className="pl-10"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      <Button
        className="w-full justify-start gap-2"
        onClick={() => {
          clearForm();
          setIsCreateMode(true);
        }}
      >
        <Plus size={20} /> Add Clause
      </Button>

      <div className="flex flex-col space-y-4 w-full max-w-3xl mx-auto">
        {!isEditMode &&
          !isCreateMode &&
          clauses
            .filter((data) =>
              data.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((clause) => (
              <Card
                key={clause._id}
                className="w-full hover:shadow-lg transition-shadow"
              >
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="mb-2">
                      {clause.title}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(clause)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => clause._id && removeClause(clause._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground/90">
                    Category
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {clause.category}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <CardTitle className="text-lg font-semibold text-foreground/90">
                      Good Aspects
                    </CardTitle>
                    <div>
                      <h4 className="text-sm font-medium text-foreground/90 mb-1">
                        Preferences
                      </h4>
                      <p className="text-sm leading-relaxed text-foreground/90">
                        {clause.goodAspect.preferences}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground/90 mb-1">
                        Description
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {clause.goodAspect.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <CardTitle className="text-lg font-semibold text-foreground/90">
                      Bad Aspects
                    </CardTitle>
                    <div>
                      <h4 className="text-sm font-medium text-foreground/90 mb-1">
                        Preferences
                      </h4>
                      <p className="text-sm leading-relaxed text-foreground/90">
                        {clause.badAspect.preferences}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground/90 mb-1">
                        Description
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {clause.badAspect.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

        {(isCreateMode || isEditMode) && (
          <div className="space-y-4 mt-4">
            {formFields()}
            <div className="flex gap-4">
              <Button
                className="w-full"
                onClick={() => {
                  clearForm();
                  isCreateMode ? setIsCreateMode(false) : setIsEditMode(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90"
                onClick={handleSubmit}
              >
                {loading ? (
                  <div className="w-full flex justify-center">
                    <PulseLoader color="white" />
                  </div>
                ) : isCreateMode ? (
                  "Save to library"
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClauseLibrary;
