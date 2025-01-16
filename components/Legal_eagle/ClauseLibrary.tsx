"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Label } from "@radix-ui/react-context-menu";
import {
  Clause,
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

const ClauseLibrary = () => {
  const [clauses, setClauses] = useState<Clause[]>([]);
  const [description, setDescription] = useState("");
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [clauseType, setClauseType] = useState("");
  const [category, setCategory] = useState("");
  const [preferences, setPreferences] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedClause, setSelectedClause] = useState<Clause>();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchClauses();
  }, []);

  useEffect(() => {
    if (selectedClause) {
      setClauseType(selectedClause.clause);
      setDescription(selectedClause.description);
      setPreferences(selectedClause.preferences);
      setCategory(selectedClause.category);
    }
  }, [selectedClause]);

  const canShowClause = () => !isEditMode && !isCreateMode;

  const handleEdit = async (clause: Clause) => {
    try {
      setSelectedClause(clause);
      setIsEditMode(true);
    } catch (error) {
      console.log(error);
    }
  };

  const submitEdit = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);

      const updatedClause = {
        clause: clauseType,
        category,
        preferences,
        description,
      };

      if (!selectedClause?._id) {
        return;
      }
      await updateClause(selectedClause?._id, updatedClause);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsEditMode(false);
      await fetchClauses();
    }
  };

  const removeClause = async (id: string) => {
    try {
      await deleteClause(id);
    } catch (error) {
      console.log(error);
    } finally {
      await fetchClauses();
    }
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const formData = {
        clause: clauseType,
        category,
        description,
        preferences,
      };

      const result = await createClause(formData);
      if (result.success) {
        setMessage("Clause added successfully!");
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
  }

  const fetchClauses = async () => {
    try {
      const { data } = await getClauses();
      if (Array.isArray(data)) {
        //@ts-ignore
        setClauses(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
      <Button
        className="w-full justify-start gap-2"
        onClick={() => {
          setIsCreateMode(true);
        }}
      >
        <Plus size={20} /> Add Clause
      </Button>
      <div className="flex flex-col space-y-4 w-full max-w-3xl mx-auto">
        {canShowClause() &&
          clauses
            .filter((data) => data.clause.includes(searchText))
            .map((clause) => (
              <Card
                key={clause._id}
                className="w-full hover:shadow-lg transition-shadow  overflow-y-scroll"
              >
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="mb-2">
                      {clause.clause}
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
                        onClick={(e) => {
                          e.preventDefault();
                          if (clause._id) {
                            removeClause(clause._id);
                          }
                        }}
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

                <CardContent className="space-y-4">
                  <CardTitle className="text-lg font-semibold text-foreground/90">
                    Preferences
                  </CardTitle>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {clause.preferences}
                  </p>
                  <div className="pt-2">
                    <h4 className="text-sm font-medium text-foreground/90 mb-1">
                      Description
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {clause.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
      {isCreateMode && (
        <div className="space-y-4 mt-4">
          <div className="space-y-4">
            <Label>Clause Type</Label>
            <Input
              placeholder="Clause Type"
              onChange={(e) => setClauseType(e.target.value)}
            />
            <Label>Category</Label>

            <Input
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            />
            <Label>Preferences</Label>

            <Input
              placeholder="Preferences"
              onChange={(e) => setPreferences(e.target.value)}
            />
            <Label>Description</Label>

            <textarea
              className="w-full h-32 p-3 border rounded-md"
              placeholder="Enter Clause text here"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="text-right text-sm text-gray-500">
              {description.length}/100
            </div>

            <div className="flex gap-4">
              <Button
                className="w-full"
                onClick={() => {
                  setIsCreateMode(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90"
                onClick={handleSubmit}
                type="button"
              >
                {loading ? (
                  <div className="w-full flex justify-center">
                    <PulseLoader color="white" />
                  </div>
                ) : (
                  "Save to library"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
      {isEditMode && (
        <div className="space-y-4 mt-4">
          <div className="space-y-4">
            <Label>Clause Type</Label>
            <Input
              placeholder="Clause Type"
              onChange={(e) => setClauseType(e.target.value)}
              value={clauseType}
            />
            <Label>Category</Label>

            <Input
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            />
            <Label>Preferences</Label>

            <Input
              placeholder="Preferences"
              onChange={(e) => setPreferences(e.target.value)}
              value={preferences}
            />
            <Label>Description</Label>

            <textarea
              className="w-full h-32 p-3 border rounded-md"
              placeholder="Enter Clause text here"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <div className="text-right text-sm text-gray-500">
              {description.length}/100
            </div>
            <div className="flex gap-4">
              <Button
                className="w-full"
                onClick={() => {
                  setIsEditMode(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90"
                onClick={() => {
                  if (!selectedClause) {
                    return;
                  }
                  submitEdit();
                }}
              >
                {loading ? (
                  <div className="flex justify-center">
                    <PulseLoader color="white" />
                  </div>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClauseLibrary;
